# InstaMass-Unfollow-Follow

A collection of JavaScript bookmarklets for automating Instagram following and unfollowing with built-in rate limiting and auto-resume functionality.

## Features

- **Auto-Follow**: Automatically follow Instagram accounts
- **Auto-Unfollow**: Automatically unfollow Instagram accounts
- Built-in breaks to avoid detection
- Auto-scrolling to find more accounts
- Handles confirmation popups automatically
- Random timing between actions to mimic human behavior
- Auto-resumes after breaks

## How to Use

### Step 1: Create the Bookmarklets

#### Follow Bookmarklet

1. Right-click your browser's bookmarks bar and select "Add new bookmark" or "Add page"
2. Name it "InstaMass-Follow"
3. Copy the entire script below and paste it into the URL/location field:

```javascript
javascript:(function(){let totalFollowed=0;const followBatch=30;const breakTime=60000;const intervalTime=Math.floor(Math.random()*(7000-4000)+4000);let noButtonsCount=0;const scrollDown=()=>{window.scrollBy(0,500);console.log("Scrolled down to load more profiles")};const handleFollowProcess=()=>{let buttons=document.querySelectorAll('button');let followButton=null;for(let btn of buttons){if(btn.innerText==='Follow'||btn.innerText==='Follow Back'){followButton=btn;break}}if(followButton){followButton.click();totalFollowed++;console.log(`Followed ${totalFollowed} users total (${totalFollowed%followBatch} in current batch)`);noButtonsCount=0;return true}noButtonsCount++;if(noButtonsCount>=3){scrollDown();noButtonsCount=0}return false};const startFollowing=()=>{let currentBatchCount=0;console.log("Starting new following batch...");const followInterval=setInterval(()=>{currentBatchCount=totalFollowed%followBatch;if(currentBatchCount>=followBatch){clearInterval(followInterval);console.log(`Followed ${followBatch} users in this batch. Taking a 1-minute break...`);setTimeout(()=>{console.log("Break finished. Automatically restarting...");startFollowing()},breakTime);return}handleFollowProcess()},intervalTime)};console.log(`Following script started with ${followBatch} users per batch and ${breakTime/1000} second breaks...`);startFollowing()})();
```

#### Unfollow Bookmarklet

1. Right-click your browser's bookmarks bar and select "Add new bookmark" or "Add page"
2. Name it "InstaMass-Unfollow"
3. Copy the entire script below and paste it into the URL/location field:

```javascript
javascript:(function(){let totalUnfollowed=0;const unfollowBatch=50;const breakTime=60000;const intervalTime=Math.floor(Math.random()*(7000-4000)+4000);const popupDelay=2000;let noButtonsCount=0;const scrollDown=()=>{window.scrollBy(0,500);console.log("Scrolled down to load more profiles")};const handleUnfollowProcess=()=>{let buttons=document.querySelectorAll('button');let followingButton=null;for(let btn of buttons){if(btn.innerText==='Following'||btn.innerText==='Unfollow'){followingButton=btn;break}}if(followingButton){followingButton.click();console.log("Clicked Following button, waiting for popup...");noButtonsCount=0;setTimeout(()=>{let confirmButtons=document.querySelectorAll('button');for(let btn of confirmButtons){if(btn.innerText==='Unfollow'||btn.innerText.includes('Unfollow')){btn.click();totalUnfollowed++;console.log(`Unfollowed ${totalUnfollowed} users total (${totalUnfollowed%unfollowBatch} in current batch)`);return true}}console.log("Couldn't find confirmation button in popup");return false},popupDelay);return true}noButtonsCount++;if(noButtonsCount>=3){scrollDown();noButtonsCount=0}return false};const startUnfollowing=()=>{let currentBatchCount=0;console.log("Starting new unfollowing batch...");const unfollowInterval=setInterval(()=>{currentBatchCount=totalUnfollowed%unfollowBatch;if(currentBatchCount>=unfollowBatch){clearInterval(unfollowInterval);console.log(`Unfollowed ${unfollowBatch} users in this batch. Taking a 1-minute break...`);setTimeout(()=>{console.log("Break finished. Automatically restarting...");startUnfollowing()},breakTime);return}handleUnfollowProcess()},intervalTime)};console.log(`Unfollowing script started with ${unfollowBatch} users per batch and ${breakTime/1000} second breaks...`);startUnfollowing()})();
```

### Step 2: Using the Follow Bookmarklet

1. Go to Instagram website (instagram.com) and log in
2. Navigate to a page with user suggestions (Explore page, hashtag search results, etc.)
3. Click the "InstaMass-Follow" bookmarklet in your bookmarks bar
4. Watch the console (Press F12 to open developer tools, then click on "Console" tab) to monitor progress

### Step 3: Using the Unfollow Bookmarklet

1. Go to Instagram website (instagram.com) and log in
2. Navigate to your profile page
3. Click on "Following" to see the list of accounts you follow
4. Click the "InstaMass-Unfollow" bookmarklet in your bookmarks bar
5. Watch the console (Press F12 to open developer tools, then click on "Console" tab) to monitor progress

### Step 4: Monitor and Stop (if needed)

- The script will automatically follow/unfollow accounts, take a 1-minute break, then continue
- To stop any script at any time, simply refresh the page
- Check the console for status updates on progress

## Customization

You can edit the bookmarklets to change these settings:

### Follow Script
- `followBatch`: Number of accounts to follow before taking a break (default: 30)
- `breakTime`: Length of break in milliseconds (default: 60000 = 1 minute)
- `intervalTime`: Random delay between follows (default: 4000-7000ms)

### Unfollow Script
- `unfollowBatch`: Number of accounts to unfollow before taking a break (default: 50)
- `breakTime`: Length of break in milliseconds (default: 60000 = 1 minute)
- `intervalTime`: Random delay between unfollows (default: 4000-7000ms)
- `popupDelay`: Delay before clicking confirmation popup (default: 2000ms)

## Warning

Using automation scripts on Instagram may violate their Terms of Service and could result in temporary or permanent account restrictions. Use at your own risk.

## Best Practices to Avoid Restrictions

1. Use lower numbers for batch size (15-30)
2. Take longer breaks (3-5 minutes)
3. Don't run scripts for extended periods
4. Avoid using follow and unfollow scripts simultaneously
5. Run scripts during your normal usage hours
6. Mix in regular manual activity between automated sessions
