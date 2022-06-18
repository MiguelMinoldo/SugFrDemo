import { FC, createContext, useContext, useState, useEffect } from 'react'
import { createClient, createConsoleLogger } from 'configcat-js'

type ConfigCatClient = ReturnType<typeof createClient>

const configcatContext = createContext<ConfigCatClient>(null)

export const ConfigcatProvider: FC = ({ children }) => {
  const [client, setClient] = useState<ConfigCatClient>()

  useEffect(() => {
    // Load the configcat client in the browser
    const configCatClient = createClient(
      process.env.NEXT_PUBLIC_CONFIGCAT_SDK_KEY,
      {
        logger:
          process.env.NODE_ENV === 'development'
            ? createConsoleLogger(3)
            : null,
      }
    )
    setClient(configCatClient)
  }, [])

  return (
    <configcatContext.Provider value={client}>
      {children}
    </configcatContext.Provider>
  )
}

export const useConfigcat = () => useContext(configcatContext)

export const useValue = (key: string, defaultValue: any, uId?: string, uCountry?: string) => {
  const [value, setValue] = useState(false)
  const configcat = useConfigcat()
  
  var userObject = {
    identifier : uId,
    country : uCountry
  };

  useEffect(() => {
    if (configcat) {
      configcat.getValueAsync(key, defaultValue, userObject).then((v) => setValue(v)).then( value => {
        console.log(key + value);
      });
    }
  }, [configcat, key, defaultValue])

  return value
}
