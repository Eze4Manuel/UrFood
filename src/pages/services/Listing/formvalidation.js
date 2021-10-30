const formValidator = {}
 


 
// validate Partner form
formValidator.validateListingFoodUpdate = (form, values, builder, setError) => {
   setError("");
   //validate the price
   if (form.price !== values.price) {
      if (!form.price) {
         return setError("Price is required")
      }
      builder.price = form.price
   }

    // validate the quantity
    if (form.quantity !== values.quantity) {
      if (!form.quantity) {
         return setError("Quantity is required")
      }
      builder.quantity = form.quantity
   }

  
   // validate the discount_amount
   if (form.discount_amount !== values.discount_amount) {
      builder.discount_amount = form.discount_amount
   }

   // validate the discount_type
    if (form.discount_type !== values.discount_type) {
      builder.discount_type = form.discount_type
   }

   // validate the description
   if (form.description !== values.description) {
      builder.description = form.description
   }

   // validate the description
   if (form.availability_status !== values.availability_status) {
      if (!form.availability_status) {
         return setError("Availability Status is required")
      }
      builder.availability_status = form.availability_status
      builder.availability_status = builder.availability_status === 'true' ? true : false;

   }

   if (Object.keys(builder).length === 0) {
      return setError("No changes to update")
   }
   // return payload
   return builder
}



// validate Partner form
formValidator.validateFoodUpdate = (form, values, builder, setError) => {
   setError("");

   //validate the name
   if (form.name !== values.name) {
      if (!form.name) {
         return setError("Name is required")
      }
      builder.name = form.name
   }

    // validate the ingredients
    if (form.ingredients !== values.ingredients) {
      if (!form.ingredients) {
         return setError("Ingredients is required")
      }
      builder.ingredients = form.ingredients
   }

   // validate the description
   if (form.description !== values.description) {
      if (!form.description) {
         return setError("description is required")
      }
      builder.description = form.description
   }
   // validate the description
   if (form.listing_status !== values.listing_status) {
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
formValidator.validateNewFoodListing = (form, builder, setError) => {
   setError("")
   // validate price
   if (!form.price) {
      return setError("Price is required")
   }
   builder.price = form.price

   if (!form.quantity) {
      return setError("Quantity is required")
   }
   builder.quantity = form.quantity
 
   builder.availability_status = form.availability_status ?? 'false'
   builder.availability_status = builder.availability_status === 'true' ? true : false;

    
   builder.vendor_id = form.vendor_id
   
   builder.food_id = form.food_id

   builder.discount_amount = form.discount_amount
   builder.discount_type = form.discount_type
  
   // return payload
   return builder
}

export default formValidator