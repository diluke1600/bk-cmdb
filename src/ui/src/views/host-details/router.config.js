import Meta from '@/router/meta'
import {
    U_HOST,
    U_RESOURCE_HOST,
    GET_AUTH_META,
    D_SERVICE_INSTANCE
} from '@/dictionary/auth'
import { MENU_BUSINESS, MENU_RESOURCE } from '@/dictionary/menu-symbol'
const component = () => import(/* webpackChunkName: "hostDetails" */ './index.vue')

export const OPERATION = {
    U_HOST,
    U_RESOURCE_HOST,
    D_SERVICE_INSTANCE
}

export const RESOURCE_HOST = 'resourceHostDetails'

export const BUSINESS_HOST = 'businessHostDetails'

export const RESOURCE_HOST_DETAILS = {
    name: RESOURCE_HOST,
    path: 'host/:id',
    component: component,
    meta: new Meta({
        owner: MENU_RESOURCE,
        auth: {
            view: null,
            operation: [U_RESOURCE_HOST],
            setDynamicMeta (to, from, app) {
                const meta = GET_AUTH_META(U_RESOURCE_HOST)
                app.$store.commit('auth/setResourceMeta', {
                    ...meta,
                    resource_id: parseInt(to.params.id)
                })
            },
            setAuthScope () {
                this.authScope = 'global'
            }
        },
        showBreadcumbs: false
    })
}

export const BUSINESS_HOST_DETAILS = {
    name: BUSINESS_HOST,
    path: 'host/:id',
    component: component,
    meta: new Meta({
        owner: MENU_BUSINESS,
        auth: {
            view: null,
            operation: [U_HOST, D_SERVICE_INSTANCE],
            setDynamicMeta (to, from, app) {
                const hostMeta = GET_AUTH_META(U_HOST)
                const serviceInstanceMeta = GET_AUTH_META(D_SERVICE_INSTANCE)
                app.$store.commit('auth/setResourceMeta', [{
                    ...hostMeta,
                    resource_id: parseInt(to.params.id),
                    bk_biz_id: parseInt(to.params.business)
                }, {
                    ...serviceInstanceMeta,
                    resource_id: parseInt(to.params.id),
                    bk_biz_id: parseInt(to.params.business)
                }])
            },
            setAuthScope () {
                this.authScope = 'business'
            }
        },
        showBreadcumbs: true,
        requireBusiness: true
    })
}

export default [RESOURCE_HOST_DETAILS, BUSINESS_HOST_DETAILS]