import fuzz from 'fuzzball'

export const fillForm = (ida) => {

    let newValue = ''

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
            } else {
                newValue = ida[i].importedFieldValue || ida[i].defaultValue
                // replace newValue in fucntion call with ida || ida above?
                newValue = findValueIfDropdown(newValue, ele)
            }
            setFieldValue(newValue, ida[i], ele)
        }
    }

    return true

}

// For each item in importDataArray





        // 1 - DONE
        // - Create importSetupArray that includes JSON objects for each mapped standard field: 
        // [{
        // standardFieldId: X,
        // importedFieldValue: Y,
        // importRowIdentifierId
        // }]

        // 2 - Get form mappings from DB [{
        // standardFieldId,
        // importRowIdentifierId,
        // formFieldSelector,
        // defaultValue,
        // overrideImportWithDefault
        // formFieldType
        // }]

        // 3 - Loop through form mappings results from DB to create importDataArray: [{
        // standardFieldId, // DON'T NEED
        // importRowIdentifierId, // DON'T NEED
        // formFieldSelector,
        // defaultValue,
        // overrideImportWithDefault,
        // formFieldType,
        // importedFieldValue, 
        // }]