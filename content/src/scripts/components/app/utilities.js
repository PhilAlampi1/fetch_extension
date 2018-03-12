import fuzz from 'fuzzball'

export const fillForm = (ida, userIsMappingForm) => {

    let newValue = '', totalFieldsPopulated = 0, importFieldsPopulated = 0, defaultFieldsPopulated = 0, valueType = null
    
    // Set events to be tested when a field is filled
    const eventNames = ['click', 'change', 'blur', 'input', 'focus', 'select', 'keydown', 'keypress', 'keyup']
  
    const possibleEvents = []
    for (let k = 0; k < eventNames.length; k++) {
        let eventHolder = new Event(eventNames[k])
        possibleEvents.push(eventHolder)
    }

    const setFieldValue = (newVal, idaItem, el) => {

        if ((idaItem.formFieldType && idaItem.formFieldType.includes('checkbox'))
            || (idaItem.formFieldType && idaItem.formFieldType.includes('radio'))) {

            if (newVal && newVal !== 'notselected') {
                el.checked = true
            } else {
                el.checked = false
            }

        } else {
            el.value = newVal
        }

    }

    const findValueIfDropdown = (val, el) => {

        if (el.options) { // if a dropdown, try to figure out the right option to select

            let elOptions = []
            let winningScore = 0
            let winningValue = null

            // Get dropdown options
            for (let i = 0; i < el.options.length; i++) {
                elOptions.push({ label: el.options[i].text, value: el.options[i].value })
            }

            // Score each option's text and value to find the closest fit and set the element's value accordingly
            elOptions.map((o) => {

                const textScore = fuzz.ratio(val, o.label)
                const valueScore = fuzz.ratio(val, o.value)
                let topItemScore = 0

                if (textScore > valueScore) {
                    topItemScore = textScore
                } else {
                    topItemScore = valueScore
                }

                if (topItemScore > winningScore) {
                    winningScore = topItemScore
                    winningValue = o.value
                }

            })

            if (winningValue) {
                return winningValue
            } else {
                return val
            }

        } else { // there were no options on this element
            return val
        }

    }

    for (let i = 0; i < ida.length; i++) {

        const ele = document.querySelector(ida[i].formFieldSelector)

        if (ele) {

            if (ida[i].overrideImportWithDefault === true) {
                newValue = ida[i].defaultValue
                valueType = 'default'
            } else {
                newValue = ida[i].importedFieldValue || ida[i].defaultValue
                !ida[i].importedFieldValue ? valueType = 'default' : valueType = 'imported'
                newValue = findValueIfDropdown(newValue, ele)
            }
            setFieldValue(newValue, ida[i], ele)

            // Vertify that the field value was set
            if (!!ele.value) {

                //Adjust the appropriate counter
                valueType === 'default' ? defaultFieldsPopulated++ : importFieldsPopulated++

                // If not mapping a form (but instead doing a full fillForm,
                // cycle through executing all possible events
                if (!userIsMappingForm) {
                    for (let j = 0; j < possibleEvents.length; j++) {
                        try {
                            ele.dispatchEvent(possibleEvents[j])
                        } catch (e) {
                            console.log(e)
                        }
                    }
                }

            }

        }

    }

    totalFieldsPopulated = defaultFieldsPopulated + importFieldsPopulated
    
    return [totalFieldsPopulated, defaultFieldsPopulated, importFieldsPopulated]

}