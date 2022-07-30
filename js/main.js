var productName=document.getElementById('name');
var productCategory=document.getElementById('category');
var productPrice=document.getElementById('price')
var productDesc=document.getElementById('description');
var addBtn=document.getElementById('btn');
var inputs=document.querySelectorAll('.form-control');
var currentIndex;
var nameDenger=document.getElementById('nameDenger');
var namesuccess=document.getElementById('namesuccess');
var categoryDenger=document.getElementById('categoryDenger');
var categorysuccess=document.getElementById('categorysuccess');
var priceDenger=document.getElementById('priceDenger');
var pricesuccess=document.getElementById('pricesuccess');
var descDenger=document.getElementById('descDenger');
var descsuccess=document.getElementById('descsuccess');
var warnMsg=document.getElementById('warnMsg');
var productList=[];

if(JSON.parse(localStorage.getItem('products'))!=null)
{
    productList=JSON.parse(localStorage.getItem('products'));
    displayProduct();
}


addBtn.onclick=function()
{
    if(addBtn.innerHTML=='Add Product')
    {
     if(productName.value=='' || productCategory.value=='' || productPrice.value=='' ||productDesc.value=='')
     {
        addBtn.disabled='true';
        document.getElementById('warnMsg').classList.remove('d-none')
     }
     else{
        document.getElementById('warnMsg').classList.add('d-none');
        addBtn.removeAttribute('disabled');
        addProduct()
        reset()
        displayProduct()
     }
    }
    else{
        updateProduct()
        reset()
        displayProduct()
    }


}
 
function addProduct()
{
    var products={
        productName:productName.value,
        productCategory:productCategory.value,
        productPrice:productPrice.value,
        productDesc:productDesc.value,
    }
productList.push(products);
localStorage.setItem('products',JSON.stringify(productList))
}


 
function displayProduct()
{
    var box=``
    for(var i=0;i<productList.length;i++)
    {
        box+=
        `
        <tr>
        <td>${i+1}</td>
        <td>${productList[i].productName}</td>
        <td>${productList[i].productCategory}</td>
        <td>${productList[i].productPrice}</td>
        <td>${productList[i].productDesc}</td>
        <td><button onclick="Delete(${i})" class='btn btn-outline-danger'>Delete</button></td>
        <td><button onclick='getProduct(${i})' class='btn btn-outline-success ms-2'>Update</button></td>
        </tr>
        `
    }
    document.getElementById('Body').innerHTML=box
}



function reset()
{
 for(var i=0;i<inputs.length;i++)
 {
    inputs[i].value=''
 }
}



function Delete(index)
{
productList.splice(index,1)
displayProduct()
localStorage.setItem('products',JSON.stringify(productList))
}


function search(searchTxt)
{
    var box=``
    for(var i=0;i<productList.length;i++){
    if(productList[i].productName.toLowerCase().includes(searchTxt.toLowerCase()))
    {
        box+=
        `
        <tr>
        <td>${i+1}</td>
        <td>${productList[i].productName}</td>
        <td>${productList[i].productCategory}</td>
        <td>${productList[i].productPrice}</td>
        <td>${productList[i].productDesc}</td>
        <td><button onclick="Delete(${i})" class='btn btn-outline-danger'>Delete</button></td>
        <td><button class='btn btn-outline-success ms-2'>Update</button></td>
        </tr>
        `
    }
    document.getElementById('Body').innerHTML=box
    }

}


function getProduct(index)
{
  currentIndex=index;
  var currentProduct=productList[index];
  console.log(currentProduct);
  productName.value=currentProduct.productName;
  productCategory.value=currentProduct.productCategory;
  productPrice.value=currentProduct.productPrice;
  productDesc.value=currentProduct.productDesc;
  addBtn.innerHTML='Update Product'
}

function updateProduct()
{
    var products={
        productName:productName.value,
        productCategory:productCategory.value,
        productPrice:productPrice.value,
        productDesc:productDesc.value,
    }
productList[currentIndex]=products
localStorage.setItem('products',JSON.stringify(productList))
}




    productName.onkeyup=function()
{
    var regexName=/^[A-Z][a-z]{3,10}$/
    if(regexName.test(productName.value))
    {
        addBtn.removeAttribute('disabled');
        productName.classList.add('is-valid')
        productName.classList.remove('is-invalid')
        nameDenger.classList.add('d-none')
        namesuccess.classList.remove('d-none')
    }
    else{
       addBtn.disabled='true';
       productName.classList.remove('is-valid')
       productName.classList.add('is-invalid')
       nameDenger.classList.remove('d-none')
       namesuccess.classList.add('d-none')
    }
  
}

productCategory.onkeyup=function()
{
    var regexName=/^[A-Z][a-z]{5,10}$/
    if(regexName.test(productCategory.value))
    {
        addBtn.removeAttribute('disabled');
        productCategory.classList.add('is-valid')
        productCategory.classList.remove('is-invalid')
        categoryDenger.classList.add('d-none')
        categorysuccess.classList.remove('d-none')
    }
    else{
       addBtn.disabled='true';
       productCategory.classList.remove('is-valid')
       productCategory.classList.add('is-invalid')
       categoryDenger.classList.remove('d-none')
       categorysuccess.classList.add('d-none')
    }
}

productPrice.onkeyup=function()
{
    var regexName=/^([0-9]{3,4}|100|10000)$/
    if(regexName.test(productPrice.value))
    {
        addBtn.removeAttribute('disabled');
        productPrice.classList.add('is-valid')
        productPrice.classList.remove('is-invalid')
        priceDenger.classList.add('d-none')
        pricesuccess.classList.remove('d-none')
    }
    else{
       addBtn.disabled='true';
       productPrice.classList.remove('is-valid')
       productPrice.classList.add('is-invalid')
       priceDenger.classList.remove('d-none')
       pricesuccess.classList.add('d-none')
    }

}

productDesc.onkeyup=function()
{
    var regexName=/^[A-Z][a-z]{2,}$/
    if(regexName.test(productDesc.value))
    {
        addBtn.removeAttribute('disabled');
        productDesc.classList.add('is-valid')
        productDesc.classList.remove('is-invalid')
        descDenger.classList.add('d-none')
        descsuccess.classList.remove('d-none')
    }
    else{
       addBtn.disabled='true';
       productDesc.classList.remove('is-valid')
       productDesc.classList.add('is-invalid')
       descDenger.classList.remove('d-none')
       descsuccess.classList.add('d-none')
    }
}

