import { appState } from "../AppState.js";
import { House } from "../Models/House.js";
import { housesService } from "../Services/HousesService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";


function _drawHouses() {
  let template = ''
  appState.houses.forEach(house => {
    template += house.HouseCard
  });
  document.getElementById('listings').innerHTML = template
}

export class HousesController {



  constructor() {
    console.log("hiello");
    // this.getAllHouses()
    _drawHouses()
    appState.on('houses', _drawHouses)
  }


  viewHouses() {
    this.getAllHouses()
    // document.getElementById('form').innerHTML = ''
    document.getElementById('form').innerHTML = House.DynamicHouseForm()
  }

  async getAllHouses() {
    try {
      await housesService.getAllHouses()
    } catch (error) {
      console.error(error)
      Pop.error("unable to connect to houses api")
    }
  }

  async createHouse() {
    try {
      event.preventDefault()
      // console.log(typeof document.getElementById('year').value);
      const formData = getFormData(event.target)
      await housesService.createHouse(formData)
    } catch (error) {
      console.error(error)
    }
  }

  async deleteHouse(id) {
    try {
      // console.log('deleting', id)
      await housesService.deleteHouse(id)
      Pop.toast('Delete House', 'success', 'bottom')
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }

  async editHouse(id) {
    try {
      event.preventDefault()
      console.log('update', id)
      const form = event.target
      const editData = getFormData(form)
      await housesService.editHouse(id, editData)
      // @ts-ignore
      bootstrap.Modal.getOrCreateInstance('#edit-modal').hide()
    } catch (error) {
      console.error(error)
      Pop.error('error editing house')
    }
  }

  openEditHouseForm(id) {
    let house = appState.houses.find(house => house.id == id)
    setHTML('edit-form', House.DynamicHouseForm(house))
  }

}