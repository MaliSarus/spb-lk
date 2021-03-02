// eslint-disable-next-line no-unused-vars
export default function (element, stateElement){
    document.addEventListener('click', function(event) {
        const elementToDetect = document.querySelectorAll(element)[0];
        const isClickInside = elementToDetect.contains(event.target);
        stateElement = isClickInside;
    })

}