const formValidator = {}
 


 
// validate Partner form
formValidator.validateVendorUpdate = (form, values, builder, data, setError) => {
   setError("")

   //validate the phone
   if (form.phone_number !== values.phone_number) {
      if (!form.phone_number) {
         return setError("vendor phone number is required")
      }
      if (!/^[0-9]+$/.test(form.phone_number)) {
         return setError("vendor Phone number should be digits only")
      }
      if (!/^0/.test(form.phone_number)) {
         return setError("vendor Phone number must start with zero. e.g (070........)")
      }
      if (form.phone_number.length !== 11) {
         return setError("Invalid vendor phone number.  phone number expects 11 digits")
      }
      builder.phone_number = form.phone_number
   }

   //validate the email
   if (form.email !== values.email) {
      if (!form.email) {
         return setError("Email is required")
      }
      builder.email = form.email
   }

   // if registration_id
   if (form.registration_id !== values.registration_id) {
      if (!form.registration_id) {
         return setError("CAC Number is required")
      }
      if (form.registration_id.length > 20) {
         return setError("CAC Number to long")
      }
      builder.registration_id = form.registration_id
   }

   // if vendor_name
   if (form.vendor_name !== values.vendor_name) {
      if (!form.vendor_name) {
         return setError("Vendor name is required")
      }
      if (form.vendor_name.length > 20) {
         return setError("Vendor name to long")
      }
      builder.vendor_name = form.vendor_name
   }

   //check if home area
   if (form.area !== values.area) {
      if (!form.area) {
         return setError("Area is required")
      }
      if (!/^[\w\s\-',]+$/i.test(form.area)) {
         return setError("No special character allowed for vendor area")
      }
      builder.area = form.area
   }

   //check if home area
   if (form.city !== values.city) {
      if (!form.city) {
         return setError("City is required")
      }
      if (!/^[\w\s\-',]+$/i.test(form.city)) {
         return setError("No special character allowed for city")
      }
      builder.city = form.city
   }

   // check if home address
   if (form.address !== values.address) {
      if (!form.address) {
         return setError("Address is required");
      }
      if (!/^[\w\s\-\\]+$/i.test(form.address)) {
         return setError("No special character allowed for vendor address")
      }
      builder.address = form.address
   }
   if (Object.keys(builder).length === 0) {
      return setError("No changes to update")
   }


   // return payload
   return builder
}



// validate vendor form
formValidator.validateNewVendor = (form, builder, setError) => {
   setError("")
   // validate first_name name
   if (!form.first_name) {
      return setError("First Name is required")
   }
   if (form.first_name < 2) {
      return setError("First Name is too short")
   }
   if (form.first_name.length > 45) {
      return setError("First Name is too long")
   }
   builder.first_name = form.first_name

  
   if (!form.last_name) {
      return setError("Last Name is required")
   }
   if (form.last_name.length < 2) {
      return setError("Last Name is too short")
   }
   if (form.last_name.length > 45) {
      return setError("Last Name is too long")
   }
   builder.last_name = form.last_name

   //validate the email
   if (!form.email) {
      return setError("email is required")
   }
   builder.email = form.email

   //validate the username
   if (!form.vendor_name) {
      return setError("Vendor Name is required")
   }
   builder.vendor_name = form.vendor_name

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

   //check if City
   if (!form.city) {
      return setError("City is required")
   }
   builder.city = form.city


    //check if registration_id
    if (!form.registration_id) {
      return setError("CAC No. is required")
   }
   builder.registration_id = form.registration_id

   // check if Address
   if (!form.address) {
      return setError("Address is required")
   }
   if (!/^[\w\s\-\\]+$/i.test(form.address)) {
      return setError("No special character allowed for Address")
   }
   builder.address = form.address

   // set user type
   builder.user_type = "vendor"

   // return payload
   return builder
}

export default formValidator