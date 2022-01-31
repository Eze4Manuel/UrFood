const formValidator = {}
 


 
// validate Partner form
formValidator.validateFoodUpdate = (form, values, builder, setError) => {
   setError("");

   //validate the name
   if (form?.name !== values.name) {
      if (!form.name) {
         return setError("Name is required")
      }
      builder.name = form.name
   }

    // validate the ingredients
    if (form?.ingredients !== values.ingredients) {
      if (!form.ingredients) {
         return setError("Ingredients is required")
      }
      builder.ingredients = form.ingredients
   }

   // validate the description
   if (form?.description !== values.description) {
      if (!form.description) {
         return setError("description is required")
      }
      builder.description = form.description
   }
   // validate the description
   if (form?.listing_status !== values.listing_status) {
      if (!form.listing_status) {
         return setError("listing_status is required")
      }
      builder.listing_status = form.listing_status
      builder.listing_status = builder.listing_status === 'true' ? true : false;

   }

   if (Object.keys(builder).length === 0) {
      return setError("No changes to update")
   }
   // return payload
   return builder
}



// validate vendor form
formValidator.validateNewFood = (form, builder, setError) => {
   setError("")
   // validate first_name name
   if (!form.name) {
      return setError("Name is required")
   }
   if (form.name < 2) {
      return setError("Name is too short")
   }
   if (form.name.length > 45) {
      return setError("Name is too long")
   }
   builder.name = form.name

   if (!form.category) {
      return setError("Category is required")
   }
   if (form.category.length < 2) {
      return setError("Category is too short")
   }
   if (form.category.length > 45) {
      return setError("Category too long")
   }
   builder.category = form.category
 
   builder.listing_status = form.listing_status ?? 'false'
   builder.listing_status = builder.listing_status === 'true' ? true : false;

    
   builder.ingredients = form.ingredients
   
   builder.description = form.description
   builder.avatar = form.avatar;
  
   // return payload
   return builder
}

export default formValidator