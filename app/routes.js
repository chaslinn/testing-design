//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// Change Box design system — bundle lives under /public/change-box/
// (served by the kit's static middleware from app/assets/change-box/).
// These routes are convenience redirects so the kits have clean URLs.
router.get('/change-box', (req, res) => res.redirect('/public/change-box/index.html'))
router.get('/change-box/website', (req, res) => res.redirect('/public/change-box/ui_kits/website/index.html'))
router.get('/change-box/app', (req, res) => res.redirect('/public/change-box/ui_kits/change-box-app/index.html'))

// Change Box design system documentation — Nunjucks pages styled with GOV.UK Frontend.
router.get('/change-box-ds', (req, res) => res.render('change-box-ds/index'))
