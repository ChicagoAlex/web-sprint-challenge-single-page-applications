import React, {useState, useEffect} from 'react';
import * as yup from 'yup'

const initialFormValues = {
    name: '',
    toppings: false
}

const OrderForm = () => {

  const formSchema =  yup.object().shape({
        name: yup.string().min(2, 'name must be at least 2 characters'),
        toppings: yup.boolean().oneOf([true], 'You must choose')
    })

    const [errors, setErrors] = useState({
        name: '',
        toppings: ''
    })

    const validateChange = (name, value) => {
        yup.reach(formSchema, name)
            .validate(value)
            .then(() =>{
                setErrors({...errors, [name]: ''})
            })
            .catch((error)=>{
                setErrors({...errors, [name]: error.errors[0]})
            })
    }

    const [disabled, setDisabled] = useState(true)


    const [form, setForm] = useState(initialFormValues)

    const formChange = (e) => {

        const name = e.target.name
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

        validateChange(name, value)

        setForm({...form, [name]: value})
    }

    const SubmitHandler = (e) => {
        e.preventDefault()
    }


    useEffect(()=>{
        formSchema.isValid(form)
        .then((valid)=>{
            setDisabled(!valid)
        })
    }, [form])



    return (
    
        <section>
            <h2>Order Your Pizza</h2>
            <div>
                {errors.name}
            </div>
        
            <form id='pizza-form' onSubmit={SubmitHandler}>
                <div>
                <label>
                    <p>Name:{errors.name}</p>
                    <input onChange={formChange} type='text' name='name' id='name-input' value={form.name} />
                </label>
                </div>
                <div>
                <label>
                    Select your toppings:
                    Pepperoni:
                    <input type='checkbox' name='toppings'/>
                    Extra Cheese
                    <input type='checkbox' name='toppings'/>
                    Veggies
                    <input type='checkbox' name='toppings'/>
                    Pineapple
                    <input type='checkbox' name='toppings'/>
                </label>
                </div>
                <div>
                <label>
                    Special instructions: 
                    <input type='text' name='special-instructions' id='special-text'/>
                </label>
                </div>
                <label>
                    <select
                        value={form.size}
                        name='size'
                        id='size-dropdown'
                    >
                        <option value=''>-- Select a size--</option>
                        <option value='small'>Small</option>
                        <option value='medium'>Medium</option>
                        <option value='large'>Large</option>
                    </select>

                </label>
                <button type='submit'  id='order-button'>Order your pizza</button>
            </form>

        </section>
    )

}




export default OrderForm