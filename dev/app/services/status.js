
App.factory('Status', [function() {
    return {
        valid: {
            name: 'Valid',
            kind: 'success',
            description: 'The item is valid'
        },
        found: {
            name: 'Found',
            kind: 'success',
            description: 'An item matching the name has been found'
        },
        created: {
            name: 'Created',
            kind: 'success',
            description: 'The item has been successfully created on the server'
        },
        updated: {
            name: 'Updated',
            kind: 'success',
            description: 'The item has been successfully updated on the server'
        },
        noExactMatch: {
            name: 'No exact match',
            kind: 'warning',
            description: 'One or more existing items match the names'
        },
        warning: {
            name: 'Warning',
            kind: 'warning',
            description: 'The item should be improved'
        },
        notFound: {
            name: 'Not found',
            kind: 'alert',
            description: 'The item does not exists on the server'
        },
        error: {
            name: 'Error',
            kind: 'alert',
            description: 'The item is invalid'
        },
        missingReference: {
            name: 'Missing reference',
            kind: 'alert',
            description: 'The item reference a non existing item'
        },
        missingDependency: {
            name: 'Missing dependency',
            kind: 'alert',
            description: 'The item requires a dependency that is missing'
        }
    }
}]);