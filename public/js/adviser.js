axios.get("api/advice").then((result) => {
    let templatePlaceHolder = document.querySelector(".advice-placeholder");
    let template = document.querySelector(".advice-template").innerHTML;
    let compiledTemplate = Handlebars.compile(template);
    let advice = result.data.data;
    console.log(advice)
    templatePlaceHolder.innerHTML = compiledTemplate({ advice });
});