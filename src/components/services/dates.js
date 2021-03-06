export const datePickerToday = () => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }
  //defaultValue="2017-05-24"
  return yyyy + '-' + mm + '-' + dd;
};


// dateStr="yyyy-mm-dd"
export const toDotNetTime = (dateStr) => {
  const fecha =  Date.parse(dateStr);
  return "/Date("+fecha+")/";
}
