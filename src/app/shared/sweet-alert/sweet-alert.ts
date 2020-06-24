import Swal from 'sweetalert2';

export function errorAlert(message: string, title?) {

  switch (message.includes(' 404 Not Found') || message.includes(' 0 Unknown Error')) {
    case true: {
      Swal.fire({
        icon: 'error',
        title: 'Something Went Wrong!!',
        text: 'Please try after sometime.',
      });
      break;
    }

    default: {
      Swal.fire({
        icon: 'error',
        title,
        text: message,
      });
      break;
    }
  }


}

export function successAlert(message: string, title?) {
  Swal.fire({
    icon: 'success',
    title,
    text: message,
  });
}

export function infoAlert(message: string, title?) {
  Swal.fire({
    icon: 'info',
    title,
    text: message,
  });
}


export function deleteAlert() {
  return Swal.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  });
}

export function confirmAlert(text?: string, buttonText?: string) {
  return Swal.fire({
    title: 'Are you sure?',
    text: text !== undefined || '' ? text : 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: buttonText !== undefined || '' ? buttonText : 'Yes, delete it!'
  });
}
