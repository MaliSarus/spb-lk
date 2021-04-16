const initAccordion = function (acc) {
  acc.forEach((el, index) => {
    const accContent = el.nextElementSibling;
    if (index === 0) {
      el.classList.add("active");
      accContent.removeAttribute('style');
      accContent.style.maxHeight = accContent.scrollHeight + "px";
    }
    else{
      el.classList.remove("active");
      accContent.removeAttribute('style');
    }

    el.addEventListener("click", function () {
      acc.forEach(el => {
        if (el !== this){
          const accContent = el.nextElementSibling;
          el.classList.remove("active");
          accContent.removeAttribute('style');
        }
      })
      this.classList.toggle("active");
      const accContent = this.nextElementSibling;
      accContent.style.maxHeight ?
        accContent.removeAttribute('style')
        : accContent.style.maxHeight = accContent.scrollHeight + "px";
    });
  })
}
export default initAccordion;