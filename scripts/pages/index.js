    /**
     * It returns a promise that resolves to an object with a photographers property, which is an array
     * of objects
     * @returns An object with a photographers property.
     */
    async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json
        const photographers = [
            {
                "name": "Ma data test",
                "id": 1,
                "city": "Paris",
                "country": "France",
                "tagline": "Ceci est ma data test",
                "price": 400,
                "portrait": "account.png"
            },
            {
                "name": "Autre data test",
                "id": 2,
                "city": "Londres",
                "country": "UK",
                "tagline": "Ceci est ma data test 2",
                "price": 500,
                "portrait": "account.png"
            },
        ]
        // et bien retourner le tableau photographers seulement une fois
        return ({
            photographers: [...photographers, ...photographers, ...photographers]})
    }

    /**
     * This function takes in an array of photographer objects and displays them on the page
     * @param photographers - an array of objects that contain the data for each photographer.
     */
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    /**
     * > The function `init()` is an asynchronous function that calls the function `getPhotographers()`
     * and then calls the function `displayData()` with the result of the function `getPhotographers()`
     * as an argument
     */
    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };

    /* Calling the function `init()` */
    init();
