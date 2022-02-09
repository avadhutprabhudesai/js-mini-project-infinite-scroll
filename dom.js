var imageContainer = document.getElementById('image-container');

function appendImagesToDom(photos, imageOnLoad) {
  var fragment = document.createDocumentFragment();

  for (const photo of photos) {
    const {
      links: { html },
      urls: { regular },
      alt_description,
    } = photo;

    var imageLink = createElementWithAttributes('a', {
      href: html,
      target: '_blank',
    });

    var image = createElementWithAttributes('img', {
      src: regular,
      alt: alt_description,
      title: alt_description,
    });
    image.addEventListener('load', imageOnLoad);

    imageLink.appendChild(image);
    fragment.appendChild(imageLink);
  }

  imageContainer.appendChild(fragment);

  function createElementWithAttributes(tagName, attributes) {
    var element = document.createElement(tagName);

    Object.entries(attributes).map(([key, val]) => {
      element.setAttribute(key, val);
    });
    return element;
  }
}

export default appendImagesToDom;
