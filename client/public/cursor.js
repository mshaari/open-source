// function for custom cursor click effect
const body = document.querySelector("body");

function cursorEffect(x,y) {

    // creates a div for the click effect
    const cursor = document.createElement('div');
    body.append(cursor);

    // addes className for css styling
    cursor.className = "cursor-effect";

    // using window left and top property of click event to position css effect
    cursor.style.left = `${x - 24}px`;
    cursor.style.top = `${y - 24}px`;

    // removes created div once effect is complete
    setTimeout(()=> {
        cursor.remove();
    },500)

};

// event listener
body.addEventListener("click",(e) => {
    cursorEffect(e.pageX, e.pageY);
});


