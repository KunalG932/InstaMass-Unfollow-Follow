(() => {
    let totalFollowed = 0;
    const followBatch = 30;
    const breakTime = 60000; // 1 minute break
    const intervalTime = Math.floor(Math.random() * (7000 - 4000) + 4000); // Random delay between 4-7 seconds
    let noButtonsCount = 0;
    
    const scrollDown = () => {
        window.scrollBy(0, 500);
        console.log("Scrolled down to load more profiles");
    };
    
    const handleFollowProcess = () => {
        let buttons = document.querySelectorAll('button');
        let followButton = null;
        
        for (let btn of buttons) {
            if (btn.innerText === 'Follow' || btn.innerText === 'Follow Back') {
                followButton = btn;
                break;
            }
        }
        
        if (followButton) {
            followButton.click();
            totalFollowed++;
            console.log(`Followed ${totalFollowed} users total (${totalFollowed % followBatch} in current batch)`);
            noButtonsCount = 0;
            return true;
        }
        
        noButtonsCount++;
        if (noButtonsCount >= 3) {
            scrollDown();
            noButtonsCount = 0;
        }
        
        return false;
    };
    
    const startFollowing = () => {
        let currentBatchCount = 0;
        console.log("Starting new following batch...");
        
        const followInterval = setInterval(() => {
            currentBatchCount = totalFollowed % followBatch;
            
            if (currentBatchCount >= followBatch) {
                clearInterval(followInterval);
                console.log(`Followed ${followBatch} users in this batch. Taking a 1-minute break...`);
                
                setTimeout(() => {
                    console.log("Break finished. Automatically restarting...");
                    startFollowing();
                }, breakTime);
                
                return;
            }
            
            handleFollowProcess();
        }, intervalTime);
    };
    
    console.log(`Following script started with ${followBatch} users per batch and ${breakTime/1000} second breaks...`);
    startFollowing();
})();
