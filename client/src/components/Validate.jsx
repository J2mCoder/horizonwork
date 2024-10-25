export const ValidateFirstname = (firstname) => {
  if (!firstname || firstname.trim() === "") {
    return "Prénom requis"
  }

  if (!/^[a-zA-ZÀ-ÿ' ]+$/.test(firstname)) {
    return "Veuillez saisir uniquement des lettres."
  }

  if (firstname.length < 3 || firstname.length > 20) {
    return "Le prénom doit contenir entre 3 et 20 caractères."
  }

  return false
}

export const ValidateLastname = (lastname) => {
  if (!lastname || lastname.trim() === "") {
    return "Nom de famille requis"
  }

  if (!/^[a-zA-ZÀ-ÿ' ]+$/.test(lastname)) {
    return "Veuillez saisir uniquement des lettres."
  }

  if (lastname.length < 3 || lastname.length > 20) {
    return "Le nom de famille doit contenir entre 3 et 20 caractères."
  }

  return false
}

export const ValidateUsername = (username) => {
  if (!username || username.trim() === "") {
    return "Nom d'utilisateur requis"
  }

  if (!/^[a-zA-Z0-9À-ÿ'_@]+$/.test(username)) {
    return "Veuillez saisir uniquement des lettres et des chiffres."
  }

  if (username.length < 3 || username.length > 20) {
    return "Le nom d'utilisateur doit contenir entre 3 et 20 caractères."
  }

  return false
}

export const ValidateEmail = (email) => {
  if (!email || !email.trim() === "") {
    return "Adresse email requise"
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Veuillez saisir une adresse email valide"
  }
  return false
}

export const ValidatePassword = (password) => {
  if (!password || !password.trim() === "") {
    return "Mot de passe requis"
  }
  if (password.length < 8) {
    return "Le mot de passe doit contenir au moins 8 caractères"
  }
  if (
    !/[a-z]/.test(password) ||
    !/[A-Z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[@$!%*#?&]/.test(password)
  ) {
    return "Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial"
  }
  return false
}

export const ValidateConfirmPassword = (confirm_password, password) => {
  if (confirm_password !== password) {
    return "Les mots de passe ne correspondent pas"
  }
  return false
}
