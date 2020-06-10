import Swal from "sweetalert2";

  export function errorAlert(message: string, title?){
    if(message.includes(" 404 Not Found")){
      Swal.fire({
        icon: "error",
        title: 'Something Went Wrong!!',
        text: 'Please try after sometime.',
      });
      return;
    }
    Swal.fire({
      icon: "error",
      title: title,
      text: message,
    });
  }

  export function successAlert(message: string, title?){
    Swal.fire({
      icon: "success",
      title: title,
      text: message,
    });
  }


  export function deleteAlert(){
    return Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
  }
