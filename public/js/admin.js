const deleteProduct = (btn) => {
  const productId = btn.parentNode.querySelector('[name=productId]').value;
  const csrfToken = btn.parentNode.querySelector('[name=_csrf]').value;
  const productElement = btn.closest('article').parentNode;

  fetch('/admin/delete-product/' + productId, {
    method: 'DELETE',
    headers: {
      'csrf-token': csrfToken
    }
  })
  .then(result => {
    return result.json();
  })
  .then(data => {
    productElement.remove(); // this works in all modern browsers
    //productElement.parentNode.removeChild(productElement); // for ie (no surprise!)
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });
};