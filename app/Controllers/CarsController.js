import { appState } from "../AppState.js"
import { Car } from "../Models/Car.js"
import { carsService } from "../Services/CarsService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML } from "../Utils/Writer.js"



function _drawCars() {
  console.log('drawing cars')
  const cars = appState.cars
  let template = ''
  cars.forEach(car => template += car.CarCard)
  setHTML('listings', template)
}


export class CarsController {
  constructor() {
    console.log('cars loaded')
    // this.getAllCars()
    this.viewCars()
    appState.on('cars', _drawCars)
    // _drawCars() this will not draw the cars even though it happens after the get call, because it still runs before the get calls response 
  }

  viewCars() {
    this.getAllCars() // getting them instead of just drawing them, because when we switch 'pages' we might not have the data in our appstate to draw
    setHTML('form', Car.DynamicCarForm())
  }


  async getAllCars() {
    try {
      await carsService.getAllCars()
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }

  async createCar() {
    try {
      event.preventDefault()
      const form = event.target
      const formData = getFormData(form)
      await carsService.createCar(formData)
      // @ts-ignore
      bootstrap.Modal.getOrCreateInstance('#create-modal').hide()
      // @ts-ignore
      form.reset()
      Pop.toast(`Created Listing for ${formData.make} ${formData.model}`, 'success', 'top', 1000)
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }

  async deleteCar(id) {
    try {
      // console.log('deleting', id)
      await carsService.deleteCar(id)
      Pop.toast('Delete Car', 'success', 'bottom')
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }

  // NOTE this is just handling the pulling up of the editable form
  openEditCarForm(id) {
    let car = appState.cars.find(car => car.id == id)
    setHTML('edit-form', Car.DynamicCarForm(car))
  }

  // NOTE this will handle the change with the database
  async updateCar(id) {
    try {
      event.preventDefault()
      console.log('update', id)
      const form = event.target
      const editData = getFormData(form)
      console.log(editData)
      await carsService.updateCar(id, editData)
      // @ts-ignore
      bootstrap.Modal.getOrCreateInstance('#edit-modal').hide()
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }
}