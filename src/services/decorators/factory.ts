export function decoratorFactory (cb) {
    return function (target, name, descriptor) {
      // Original decorated function
      const implementation = descriptor.value
  
      // Check if its a function to decorate
      if (typeof implementation === 'function') {
        // Decorate the underlying decorator
        descriptor.value = async function (args, ...rest) {
          try {
            // this = underlying decorator function context
            // Call sub decorator with implementation and arguments to call underlying decorated function
            return cb.call(this, implementation, args, ...rest)
          } catch (e) {
            throw new Error(e.message)
          }
        }
      }
  
      return descriptor
    }
  }