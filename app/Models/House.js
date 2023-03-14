

export class House {
  constructor(data) {
    this.id = data.id
    this.levels = data.levels
    this.bedrooms = data.bedrooms
    this.bathrooms = data.bathrooms
    this.imgUrl = data.imgUrl
    this.year = data.year
    this.price = data.price
    this.description = data.description
  }

  get HouseCard() {
    return `
    <div class="col-6 col-md-4 text-dark">
      <div class="house-card elevation-2">
        <img class="rounded img-fluid"
          src="${this.imgUrl}" alt="" title="${this.year}">
        <div class="p-2">
          <h5 class="text-center border-bottom border-dark">${this.year} ${this.bedrooms} beds | ${this.bathrooms} baths</h5>
          <p>${this.description}  <br>Levels : ${this.levels}</p>
          <p class="text-end">💲${this.price}</p>
          <button class="btn btn-outline-danger" title="delete car" onclick="app.housesController.deleteHouse('${this.id}')"><i class="mdi mdi-delete" ></i></button>
          <button onclick="app.housesController.openEditHouseForm('${this.id}')" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#edit-modal"><i class="mdi mdi-pen"></i></button>
        </div>
      </div>
    </div>`
  }

  static DynamicHouseForm(house = {}) {
    return `
    <form onsubmit="app.housesController.${house.id ? `editHouse(${house.id})` : 'createHouse()'}" class="row rounded p-4">
      <h3>${house.id ? 'Edit' : 'List'} a House</h3>
      <div class="mb-2 col-4">
        <label for="year">Year</label>
        <input type="number" name="year" id="year" class="form-control"
          placeholder="When was your house built?" value="${house.year || ''}">
      </div>
      <div class="mb-2 col-4">
        <label for="bedrooms">Bedrooms</label>
        <input type="number" name="bedrooms" id="bedrooms" class="form-control" required min=0
          placeholder=" # of bedrooms" value="${house.bedrooms || ''}">
      </div>
      <div class="mb-2 col-4">
        <label for="bathrooms">Bathrooms</label>
        <input type="number" name="bathrooms" id="bathrooms" class="form-control" required min=0
          placeholder=" # of bathrooms" value="${house.bathrooms || ''}">
      </div>
      <div class="mb-2 col-12">
        <label for="imgUrl">Image URL</label>
        <input type="url" name="imgUrl" id="imgUrl" class="form-control" required
          placeholder="Please enter a url for an image..." value="${house.imgUrl || ''}">
      </div>
      <div class="mb-2 col-12">
        <label for="description">Description</label>
        <input type="text" name="description" id="description" class="form-control" maxlength="500"
          placeholder="100 character max" value="${house.description || ''}">
      </div>
      <div class="mb-2 col-6">
        <label for="levels">Levels</label>
        <input type="number" name="levels" id="levels" class="form-control" required min="1"
        value="${house.levels || ''}">
      </div>
      <div class="mb-2 col-6">
        <label for="price">Price</label>
        <input type="number" name="price" id="price" class="form-control" required min="1" 
        value="${house.price || ''}">
      </div>
      <div class="text-end mt-2">
        <button data-bs-toggle="modal" data-bs-target="#create-modal" class="btn" type="button">cancel</button>
        <button class="btn btn-primary" type="submit">submit</button>
      </div>
    </form>`
  }



}