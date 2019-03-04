export class RequestError {
  constructor({ title, statusCode, error, exception }) {
    this.message = error
    this.title = title
    this.exception = exception
  }

  hasFormErrors() {
    return (this.message != null);
  }



  // getFormErrors(field = null) {
  //   if (this.formErrors != null) {
  //     if (field == null) {
  //       return this.formErrors
  //     }
  //     return this.formErrors[field]
  //   }
  //   return null
  // }
  //
  // getFormErrorMessages() {
  //   if (this.formErrors != null) {
  //     let errors = this.getFormErrors();
  //     let errorsArray = Object.keys(errors).map((key) => {
  //       return errors[key]
  //     })
  //
  //     return errorsArray.flatMap(element => {
  //       return element
  //     })
  //   }
  //   return null
  // }
}
