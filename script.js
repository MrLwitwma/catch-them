const height = window.innerHeight;
const width = window.innerWidth;

function start() {
    const objects = document.querySelectorAll(".object");
    objects.forEach(function(object) {
        object.style.top = Math.random() * height + 'px';
        object.style.left = Math.random() * width + 'px';
    });
}

function change_position(object) {
    object.style.visibility = "hidden";
    object.style.top = Math.random() * height + 'px';
    object.style.left = Math.random() * width + 'px';
};

document.addEventListener("DOMContentLoaded", function() {
    start()
    let points = 0
    const cursor_circle = document.getElementById('cursor_circle');
    // Update circle position based on mouse or touch movement
    function updateCursorPosition(x, y) {
        cursor_circle.style.top = y + 'px';
        cursor_circle.style.left = x + 'px';
    }

    function handleMove(event) {
        const mouseX = event.clientX || event.touches[0].clientX;
        const mouseY = event.clientY || event.touches[0].clientY;
        updateCursorPosition(mouseX, mouseY);

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
            object.addEventListener('click', () => {
                points = points + 1
                user_points.textContent = points
                object.remove()
            })
        });

        if (objects.length === 0) {
            const overScreen = document.getElementById('over');
            overScreen.style.visibility = 'visible';
        }
    }

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("touchmove", function(event) {
        event.preventDefault();
        handleMove(event);
    }, { passive: false });
});
