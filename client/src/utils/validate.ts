export const validateInfo = (values: any) => {
  let errors: any = {};

  if (!values.username.trim()) {
    errors.username = 'Se requiere un nombre de usuario';
  }
  // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
  //   errors.name = 'Enter a valid name';
  // }

  if (!values.email) {
    errors.email = 'Se requiere correo electronico';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Correo electronico inválido';
  }
  if (!values.password) {
    errors.password = 'Se requiere contraseña';
  } else if (values.password.length < 6) {
    errors.password = 'La contraseña debe tener mas de 6 caracteres';
  }

  if (!values.password2) {
    errors.password2 = 'Se requiere contraseña';
  } else if (values.password2 !== values.password) {
    errors.password2 = 'Las contraseñas no coinciden';
  }
  return errors;
}