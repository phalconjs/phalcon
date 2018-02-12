const pathToRegexp = require('path-to-regexp')
var keys = []
var l = '/food/*'
var re = pathToRegexp('/foo/:bar/user/:name', keys)

console.log(re.exec('/foo/lo/user/bob'))
console.log(keys)

// if/op
// if/op/lol
// if/fg
// if

var tt = [{
    path: '/if',
    component: 'RootC',
    children: [{
            path: '/op',
            component: 'RTC',
            children: [{
                path: '/lol',
                component: 'FGT'
            }]
        },
        {
            path: '/fg',
            component: 'FGTYU'
        }
    ]
}]
var t = [{
        path: '/',
        component: 'Movies',
        redirectTo: '/movies'
    },
    {
        path: '/goat',
        component: 'Movies',
        children: [{
            path: '/cow',
            component: 'Tvshows'
        }]
    },
    { path: '/movies', component: 'Movies' },
    { path: '/tvshows', component: 'Tvshows' }
]
var defRoutes = []

var pathName = []

function parset(t, o) {
    if (!o) {
        pathName.push({ path: t.path, component: t.component })
    }
    if (t.children) {
        t.children.forEach((child) => {
            if (o)
                pathName.push({ path: o + child.path, component: child.component })
            else
                pathName.push({ path: t.path + '' + child.path, component: child.component })
        })

        t.children.forEach((child) => {
            parset(child, t.path + '' + child.path + '/')
        })
    }
}

function defRoute(p) {
    p.forEach((r) => {
        if (r.children)
            parset(r)
        else
            defRoutes.push(r)
    })
    defRoutes = [...defRoutes, ...pathName]
}
defRoute(t)
console.log(defRoutes)