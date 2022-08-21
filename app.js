const button = document.querySelector('button');
const progress_bar_color = document.querySelector('.progress');
const displaySpeedResultDiv = document.querySelector('.speed-text');

const fileSizeInBits = 1343591 * 8;


const loadImageGIF = () => {

    return new Promise((resolve, reject) => {

        const image = new Image();

        image.src = `./test.gif?${Math.random() * 10000}`; // the bigger the image file, the more accurate is the result

        // we did "./test.gif?${Math.random() * 10000}" instead of just './test.gif'because test.gif sometimes
        // get cached and that's why it loads in zero seconds but in reality, an image do takes some second to 
        // load. To avoid this, we wrote './test.gif?${Math.random() * 10000}' instead of just './test.gif'
    
        let startTime = Date.now();
    
        
        image.onload = () => {
    
            const endTime = Date.now();
    
            const totalTimeToLoadGIF = endTime - startTime;

            resolve(totalTimeToLoadGIF);
    
        }

        image.onerror = (error) => {

            reject(error);

        }

    });


};


const getLoadGIFSpeed = async () => {

    const loadTime = await loadImageGIF();

    // if image gets catched which often happen sometime, then, our load time can get zero.
    if(loadTime < 1) {

        loadTime = 1;

    }

    const speedInBytesPerSeconds = fileSizeInBits / loadTime;

    const speedInKbps = speedInBytesPerSeconds / 1024;

    return speedInKbps;

}


const totalNumberOfTestsForAccurateResult = 100;

const test_result_final = [];

const getAverageSpeed = () => {
     
    let sum = test_result_final.reduce((num1, num2) => {

        return num1+num2;

    }, 0);

    return sum / test_result_final.length;
};

button.addEventListener('click', async () => {

    // the more no. of times we run the test, the more accurate will be the result
    for (let i = 0; i < totalNumberOfTestsForAccurateResult; i++) {

        const speed = await getLoadGIFSpeed();

        test_result_final.push(speed);

        progress_bar_color.style.width = `${(((i + 1) / totalNumberOfTestsForAccurateResult) * 100)}%` 
        // calculating the percentage :- 
        // 1st iteration => ((0 + 1) / 100) * 100 => 1% width
        // 2nd iteration => ((1 + 1) / 100) * 100 => 2% width  and it goes on and on  


        displaySpeedResultDiv.textContent = `${getAverageSpeed()}kbps`;

    }

});