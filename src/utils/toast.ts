export function toast(message: string, color = "primary", duration = 3000) {
  const toast = document.createElement("ion-toast");
  toast.message = message;
  toast.duration = duration;
  toast.color = color;
  toast.position = "top";
  toast.cssClass = "toast-class";
  //New Check from Feature Branch.
  document.body.appendChild(toast);
  return toast.present();
}
