import getConfig  from 'next/config'
const { publicRuntimeConfig } = getConfig()
const CONFIG = {
    NEXT_PUBLIC_API_URL: publicRuntimeConfig.NEXT_PUBLIC_API_URL

};

export default CONFIG;