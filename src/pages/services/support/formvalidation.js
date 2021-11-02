const formValidator = {}




// validate Partner form
formValidator.validateSupportUpdate = (form, values, builder, data, setError) => {
   setError("")
   //validate the assigned_support_user
   if (form.assigned_support_user !== values.assigned_support_user) {
      if (!form.assigned_support_user) {
         return setError("Assigned support is required")
      }
      builder.assigned_support_user = form.assigned_support_user
   }
   //validate the status
   if (form.status !== values.status) {
      if (!form.status) {
         return setError("Status is required")
      }
      builder.status = form.status.code
   }
   if (Object.keys(builder).length === 0) {
      return setError("No changes to update")
   }
   // return payload
   return builder
}



// validate vendor form
formValidator.validateNewSupport = (form, builder, setError) => {
   setError("")
   // validate first_name name
   if (!form.title) {
      return setError("Title is required")
   }
   if (form.title < 2) {
      return setError("Title is too short")
   }
   if (form.title.length > 45) {
      return setError("Title is too long")
   }
   builder.title = form.title


   if (!form.comment) {
      return setError("Comment is required")
   }
   if (form.comment.length < 2) {
      return setError("Comment is too short")
   }
   if (form.comment.length > 65) {
      return setError("Comment is too long")
   }
   builder.comment = form.comment

   //validate the email
   if (!form.email) {
      return setError("email is required")
   }
   builder.email = form.email

   builder.support_type = form.support_type.code

   builder.assigned_support_user = form.assigned_support_user

   builder.status = form.status.code

   // return payload
   return builder
}

export default formValidator