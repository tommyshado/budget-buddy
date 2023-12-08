axios.get("api/products").then((result) => {
    let templatePlaceHolder = document.querySelector(".expenses-placeholder");
    let template = document.querySelector(".expenses-template").innerHTML;
    let compiledTemplate = Handlebars.compile(template);
    let expenses = result.data.data;
    console.log(expenses)
    templatePlaceHolder.innerHTML = compiledTemplate({ expenses });
});