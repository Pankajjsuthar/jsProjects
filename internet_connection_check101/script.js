//selecting all the required elements
const wrapper = document.querySelector(".wrapper"),
    toast = wrapper.querySelector(".toast"),
    title = toast.querySelector("span"),
    subTitle = toast.querySelector("p"),
    wifiIcon = toast.querySelector(".icon"),
    closeIcon = toast.querySelector(".close-icon");

window.onload = () => {
    function ajax() {
        let xhr = new XMLHttpRequest(); // creating new XML object
        xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true);//sending get request on this URL
        xhr.onload = () => {
            //once ajax loaded
            //if ajax statys is equal to 200 or less than 300 that means user is getting data from that provided url
            //or his/her response status is 200 that means he/she is online

            if (xhr.status >= 200 && xhr.status < 300) {
                toast.classList.remove("offline");
                title.innerText = "You're online now";
                subTitle.innerText = "hurray! Internet is connected.";
                wifiIcon.innterHTML = '<i class = "uil uil-wifi"></i>';
                closeIcon.onclick = () => {
                    //hide toast notification on close icon click
                    wrapper.classList.add("hide");
                }
                setTimeout(() => {
                    //hide toast notification automatically after 5 seconds
                    wrapper.classList.add("hide");
                }, 10000);
            }
            else {
                offline();//calling offline function if ajax status is not equal to 200 or not less than 300
            }
        }
        xhr.onerror = () => {
            offline();//calling offline function if the passed url is returning 404 or other error
        }
        xhr.send();//sending get request to the passed url
    }

    function offline() {//function for offline
        wrapper.classList.remove("hide");
        toast.classList.add("offline");
        title.innerText = "you're offline now";
        subTitle.innerText = "oops! Internet is disconnected.";
        wifiIcon.innerHTML = '<i class="uil uil-wifi-slash"></i>';
        // closeIcon.onclick = ()=>{
        //     //hide toast notification on close icon click
        //     wrapper.classList.add("hide");
        // }
        // setTimeout(()=>{
        //     //hide toast notification automatically after 5 seconds
        //     wrapper.classList.add("hide");
        // },5000);
    }

    setInterval(() => {
        ajax();//this setInterval function call ajax frequently after 100ms
    }, 1000);
}