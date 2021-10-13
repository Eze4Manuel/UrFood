const formValidator = {}

// validate pharmacy form
formValidator.validateContactPersonDetails = (form, values, builder, setError) => {
   setError("")

   //validate the phone
   if (form.phone_number !== values.contact_phone_number) {
      if (!form.phone_number) {
         return setError("Contact person phone number is required")
      }
      if (!/^[0-9]+$/.test(form.phone_number)) {
         return setError("Contact person phone number should be digits only")
      }
      if (!/^0/.test(form.phone_number)) {
         return setError("Contact person phone number must start with zero. e.g (070........)")
      }
      if (form.phone_number.length !== 11) {
         return setError("Invalid contact person phone number. Contact person phone number expects 11 digits")
      }
      builder.contact_phone_number = form.phone_number
   }

   //validate the email
   if (form.email !== values.contact_email) {
      if (!form.email) {
         return setError("Contact person email is required")
      }
      builder.contact_email = form.email
   }

   if (Object.keys(builder).length === 0) {
      return setError("No changes to update")
   }

   // return payload
   return builder
}


 
// validate Partner form
formValidator.validatePartnerUpdate = (form, values, builder, data, setError) => {
   setError("")

   //check organization name
   if (form.organization !== values.organization) {
      if (!form.organization) {
         return setError("Organization name is required")
      }
      if (form.organization.length < 5) {
         return setError("Organization name is too short")
      }
      if (form.organization.length > 100) {
         return setError("Organization name is too long")
      }
      builder.organization = form.organization
   }


   //validate the phone
   if (form.phone_number !== values.phone_number) {
      if (!form.phone_number) {
         return setError("Pharmacy phone number is required")
      }
      if (!/^[0-9]+$/.test(form.phone_number)) {
         return setError("Pharmacy Phone number should be digits only")
      }
      if (!/^0/.test(form.phone_number)) {
         return setError("Pharmacy Phone number must start with zero. e.g (070........)")
      }
      if (form.phone_number.length !== 11) {
         return setError("Invalid pharmacy phone number. Pharmacy phone number expects 11 digits")
      }
      builder.partner_data = [{ ...data.partner_data[0], phone_number: form.phone_number }]

   }

   //validate the email
   if (form.email !== values.email) {
      if (!form.email) {
         return setError("Email is required")
      }
      builder.partner_data = [{ ...data.partner_data[0], email: form.email }]

   }

   // if branch
   if (form.branch !== values.branch) {
      if (!form.branch) {
         return setError("Branch name is required")
      }
      if (form.branch.length > 20) {
         return setError("Branch name to long")
      }
      builder.branch = form.branch
   }

   // if username
   if (form.username !== values.username) {
      if (!form.username) {
         return setError("Username name is required")
      }
      if (form.username.length > 20) {
         return setError("Username name to long")
      }
      builder.username = form.username
   }

   //check if home area
   if (form.area !== values.area) {
      if (!form.area) {
         return setError("Area is required")
      }
      if (!/^[\w\s\-',]+$/i.test(form.area)) {
         return setError("No special character allowed for home area")
      }
      builder.area = form.area
   }

   // check if home address
   if (form.address !== values.address) {
      if (!form.address) {
         return setError("Address is required")
      }
      if (!/^[\w\s\-\\]+$/i.test(form.address)) {
         return setError("No special character allowed for pharmacy address")
      }
      builder.address = form.address
   }
   if (Object.keys(builder).length === 0) {
      return setError("No changes to update")
   }

   // return payload
   return builder
}



// validate pharmacy form
formValidator.validateNewPartner = (form, builder, setError) => {
   setError("")
   // validate organization name
   if (!form.organization) {
      return setError("Organization Name is required")
   }
   if (form.organization < 2) {
      return setError("Organization Name is too short")
   }
   if (form.organization.length > 45) {
      return setError("Organization Name is too long")
   }
   builder.organization = form.organization

  

   if (!form.branch) {
      return setError("Branch is required")
   }
   if (form.branch.length < 2) {
      return setError("Branch is too short")
   }
   if (form.branch.length > 45) {
      return setError("Branch is too long")
   }
   builder.branch = form.branch

   //validate the email
   if (!form.email) {
      return setError("email is required")
   }
   builder.email = form.email

   //validate the username
   if (!form.username) {
      return setError("Username is required")
   }
   builder.username = form.username

   //validate the phone
   if (!form.phone_number) {
      return setError("phone number is required")
   }
   if (!/^[0-9]+$/.test(form.phone_number)) {
      return setError("Phone number should be digits only")
   }
   if (!/^0/.test(form.phone_number)) {
      return setError("Phone number must start with zero. e.g (070........)")
   }
   if (form.phone_number.length !== 11) {
      return setError("Invalid phone number. Phone number expects 11 digits")
   }
   builder.phone_number = form.phone_number

   //check the password
   if (!form.password) {
      return setError("password is required")
   }
   //check if its above minimum number
   if (form.password.length < 6) {
      return setError("Password must be 6 characters or more")
   }
   //check if its above minimum number
   if (form.password.length > 15) {
      return setError("Password must be less than 15 characters")
   }
   //check if there's capital letter
   if (!/[A-Z]/.test(form.password)) {
      return setError("Password must have atleast one capital letter, one small letter and one number")
   }
   //check if there's small letter
   if (!/[a-z]/.test(form.password)) {
      return setError("Password must have atleast one capital letter, one small letter and one number")
   }
   //check if there's number
   if (!/[0-9]/.test(form.password)) {
      return setError("Password must have atleast one capital letter, one small letter and one number")
   }
   builder.password = form.password


   //check if Area
   if (!form.area) {
      return setError("Area is required")
   }
   builder.area = form.area

   // check if Address
   if (!form.address) {
      return setError("Address is required")
   }
   if (!/^[\w\s\-\\]+$/i.test(form.address)) {
      return setError("No special character allowed for Address")
   }
   builder.address = form.address

   // set user type
   builder.user_type = "partner"

   // return payload
   return builder
}

export default formValidator