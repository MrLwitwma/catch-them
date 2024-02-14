const height = window.innerHeight;
const width = window.innerWidth;

function start(){
    const objects = document.querySelectorAll(".object");
    objects.forEach(function(object) {
        object.style.top = Math.random() * height + 'px';
        object.style.left = Math.random() * width + 'px';
    });
}
function change_position(object){
    object.style.visibility = "hidden";

    object.style.top = Math.random() * height + 'px';
    object.style.left = Math.random() * width + 'px';
};


document.addEventListener("DOMContentLoaded", function() {
    start()
    let points = 0
    const cursor_circle = document.getElementById('cursor_circle');
    // Update circle position based on mouse movement
    document.addEventListener("mousemove", function(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        cursor_circle.style.top = mouseY + 'px';
        cursor_circle.style.left = mouseX + 'px';
    });

    // Update object visibility based on mouse position
    document.addEventListener("mousemove", function(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const user_points = document.getElementById('user_score');


        const objects = document.querySelectorAll(".object");
        objects.forEach(function(object) {
            const rect = object.getBoundingClientRect();
            const objectX = rect.left + rect.width / 2;
            const objectY = rect.top + rect.height / 2;
            const distance = Math.sqrt((mouseX - objectX) ** 2 + (mouseY - objectY) ** 2);
            if (distance <= 100) {
                object.style.visibility = "visible";
                setTimeout(function() {
                    change_position(object);
                }, 1000);
                
            } else {
                // object.style.visibility = "hidden";
            }
            object.addEventListener('click', ()=>{
                points = points + 1
                user_points.textContent = points
                object.remove()
            })
        });
        if (objects.length === 0) {
            const overScreen = document.getElementById('over');
            overScreen.style.visibility = 'visible';
        }
    });
});