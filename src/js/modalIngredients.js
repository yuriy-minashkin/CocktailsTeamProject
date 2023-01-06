import { searchIngredientsByName } from './CocktailsApiService';
import * as icons from '../images/icons.svg';

const refs = {
    modal: document.querySelector('[data-ingredients-modal]'),
    cocktailsCard: document.querySelector('.cocktails-modal'),
    ingredientsCard: document.querySelector('.ingredients-modal'),
};

refs.cocktailsCard.addEventListener('click', onIngredientClick);

function onIngredientClick(evt) {
    evt.preventDefault();
    
    if(evt.target.classList.value !== 'cocktails-modal__link') {
        return
    }

    let searchParams = evt.target.textContent;

    searchIngredientsByName(searchParams.trim()).then(data => {
        const drink = data.ingredients[0];
        showIngredientCard(drink);
        // console.log(drink)
    })
}

function showIngredientCard(drink) {
    toggleShowModal();
    clearIngredientList();
    addToIngredient(drink);
    closeModal();
}

function closeModal() {
    const closeModalBtn = document.querySelector('.ingredients-modal__close');
    closeModalBtn.addEventListener('click', toggleShowModal);
    // modal.addEventListener('click', toggleShowModal)
}

function toggleShowModal() {
    refs.modal.classList.toggle('show-modal');
}

function addToIngredient(drink)  {
    refs.ingredientsCard.insertAdjacentHTML('beforeend', createIngredientCard(drink));
}

function clearIngredientList() {
    refs.ingredientsCard.innerHTML = '';
}

function createIngredientCard({ strIngredient, strType, strDescription, strAlcohol }) {
    return `
    <button type="button" class="ingredients-modal__close" data-ingredients-modal-close>
        <svg width="18px" height="18px">
            <use href="${icons}#icon-vector-off"></use>
        </svg>
    </button>
    <div class="ingredients-modal__card">
        <h4 class="ingredients-modal__title"> ${strIngredient} </h4>
        <div class="ingredients-modal__line"></div>
        <p class="ingredients-modal__text"> ${strDescription ? `${strDescription}` : 'This information will be added soon'}</p>
        <ul class="ingredients-modal__list">
            <li><p class="ingredients-modal__pretitle"> ${strType ? `✶ Type : ${strType}` : ''} </p></li>
            <li><p class="ingredients-modal__pretitle"> ✶ Alcohol : ${strAlcohol} </p></li>
        </ul>
        <button type="button" class="ingredients-modal__btn" data-ingredients-modal-btn>Add to favorite</button>
    </div>  `
}

