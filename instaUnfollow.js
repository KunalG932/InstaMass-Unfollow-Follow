(() => {
    let totalUnfollowed = 0;
    const unfollowBatch = 50;
    const breakTime = 60000;
    const intervalTime = Math.floor(Math.random() * (7000 - 4000) + 4000);
    const popupDelay = 2000;
    let noButtonsCount = 0;
    
    const scrollDown = () => {
        window.scrollBy(0, 500);
        console.log("Scrolled down to load more profiles");
    };
    
    const handleUnfollowProcess = () => {
        let buttons = document.querySelectorAll('button');
        let followingButton = null;
        
        for (let btn of buttons) {
            if (btn.innerText === 'Following' || btn.innerText === 'Unfollow') {
                followingButton = btn;
                break;
            }
        }
        
        if (followingButton) {
            followingButton.click();
            console.log("Clicked Following button, waiting for popup...");
            noButtonsCount = 0;
            
            setTimeout(() => {
                let confirmButtons = document.querySelectorAll('button');
                for (let btn of confirmButtons) {
                    if (btn.innerText === 'Unfollow' || btn.innerText.includes('Unfollow')) {
                        btn.click();
                        totalUnfollowed++;
                        console.log(`Unfollowed ${totalUnfollowed} users total (${totalUnfollowed % unfollowBatch} in current batch)`);
                        return true;
                    }
                }
                console.log("Couldn't find confirmation button in popup");
                return false;
            }, popupDelay);
            
            return true;
        }
        
        noButtonsCount++;
        if (noButtonsCount >= 3) {
            scrollDown();
            noButtonsCount = 0;
        }
        
        return false;
    };
    
    const startUnfollowing = () => {
        let currentBatchCount = 0;
        console.log("Starting new unfollowing batch...");
        
        const unfollowInterval = setInterval(() => {
            currentBatchCount = totalUnfollowed % unfollowBatch;
            
            if (currentBatchCount >= unfollowBatch) {
                clearInterval(unfollowInterval);
                console.log(`Unfollowed ${unfollowBatch} users in this batch. Taking a 1-minute break...`);
                
                setTimeout(() => {
                    console.log("Break finished. Automatically restarting...");
                    startUnfollowing();
                }, breakTime);
                
                return;
            }
            
            handleUnfollowProcess();
        }, intervalTime);
    };
    
    console.log(`Unfollowing script started with ${unfollowBatch} users per batch and ${breakTime/1000} second breaks...`);
    startUnfollowing();
})();
