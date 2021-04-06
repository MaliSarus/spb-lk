function squaredButtonOnResize(buttonsList) {
    buttonsList.forEach(button => {
        const squareButtonHeight = button.offsetHeight;
        button.style.maxWidth = squareButtonHeight + 'px'
        button.style.minWidth = squareButtonHeight + 'px'
    })
}

export default function squaredButton(buttonsList) {
    window.removeEventListener('resize', squaredButtonOnResize)
    buttonsList.forEach(button => {
        const squareButtonHeight = button.offsetHeight;
        button.style.maxWidth = squareButtonHeight + 'px'
        button.style.minWidth = squareButtonHeight + 'px'
    })
    window.addEventListener('resize', squaredButtonOnResize(buttonsList))
}