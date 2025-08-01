let recipe = [];

function addIngredient()
{
    const name = document.getElementById('ingredient_name').value;
    const quantity = +document.getElementById('ingredient_quantity').value;
    const measure = document.getElementById('ingredient_measure').value;

    if(!name) {
        alert('Введите название ингредиента.');
        return false;
    }

    recipe.push({
        name: name,
        quantity: quantity,
        measure: measure
    });

    let text;

    if(!quantity) {
        text = `${name} - по вкусу`;
    } else {
        text = `${name} - ${quantity} ${measure}`;
    }

    let ingredientElem = document.createElement('div');
    ingredientElem.classList.add('ingredient_elem');
    ingredientElem.innerHTML = `
        <div>${text}</div>
        <button type="button" class="btn btn-danger btn-sm" data-name="${name}" onclick="deleteIngredient(this)">&times;</button>
    `;

    document.getElementById('ingredient_list').appendChild(ingredientElem);

    document.getElementById('ingredient_name').value = '';
    document.getElementById('ingredient_quantity').value = '';
}

function deleteIngredient(btn)
{
    let name = btn.dataset.name;

    for(var i = 0; i < recipe.length; i++) {
        if(name === recipe[i].name) {
            recipe.splice(i,1);
            btn.closest('.ingredient_elem').remove();
            break;
        }
    }
}

function renameRecipe()
{
    let name = prompt("Введите название рецепта");

    if(name) {
        document.getElementById('recipe_name').innerHTML = name;
    }
}

function calculateRecipe()
{
    const defaultResultElem = document.getElementById('recipe_result_default');
    const calculatedResultElem = document.getElementById('recipe_result_calculated');

    defaultResultElem.innerHTML = '';
    calculatedResultElem.innerHTML = '';

    const ratioType = document.getElementById('calculate_ratio_type').value;
    const ratio = +document.getElementById('calculate_ratio').value;

    if(!ratio) {
        alert("Введите число, кроме 0!");
        return false;
    } else if(!recipe.length) {
        alert("Добавьте хотя бы один ингредиент!");
        return false;
    }

    let newRecipe = [];

    if(ratioType === 'down') {
        for(var i = 0; i < recipe.length; i++) {
            newRecipe.push({
                name: recipe[i].name,
                quantity: (recipe[i].quantity / ratio).toFixed(2),
                measure: recipe[i].measure
            });
        }
    } else if(ratioType === 'up') {
        for(var i = 0; i < recipe.length; i++) {
            newRecipe.push({
                name: recipe[i].name,
                quantity: recipe[i].quantity * ratio,
                measure: recipe[i].measure
            });
        }
    }

    for(var i = 0; i < recipe.length; i++) {
        let text = '';

        if(recipe[i].quantity === 0) {
            text = `${recipe[i].name} - по вкусу`;
        } else {
            text = `${recipe[i].name} - ${recipe[i].quantity} ${recipe[i].measure}`;
        }

        let elem = document.createElement('div');
        elem.classList.add('recipe_result_default_ingredient');
        elem.innerHTML = text;

        defaultResultElem.appendChild(elem);
    }

    for(var i = 0; i < newRecipe.length; i++) {
        let text = '';

        if(recipe[i].quantity === 0) {
            text = `${newRecipe[i].name} - по вкусу`;
        } else {
            text = `${newRecipe[i].name} - ${newRecipe[i].quantity} ${newRecipe[i].measure}`;
        }

        let elem = document.createElement('div');
        elem.classList.add('recipe_result_calculated_ingredient');
        elem.innerHTML = text;

        calculatedResultElem.appendChild(elem);
    }

    document.getElementById('recipe').style.display = 'block';
}

function copyRecipe(variant)
{
    var text = document.getElementById('recipe_name').textContent+"\n";

    if(variant === 'default') {
        document.querySelectorAll('.recipe_result_default_ingredient').forEach(elem => {
            text += elem.textContent+"\n";
        });

        navigator.clipboard.writeText(text)
            .then(() => {
                alert("Рецепт успешно скопирован!");
            })
            .catch(err => {
                alert("Не удалось скопировать текст: " + err);
            });
    } else if(variant === 'calculated') {
        document.querySelectorAll('.recipe_result_calculated_ingredient').forEach(elem => {
            text += elem.textContent+"\n";
        });

        navigator.clipboard.writeText(text)
            .then(() => {
                alert("Рецепт успешно скопирован!");
            })
            .catch(err => {
                alert("Не удалось скопировать текст: " + err);
            });
    }
}