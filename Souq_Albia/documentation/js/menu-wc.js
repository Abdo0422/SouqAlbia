'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">souq-albia documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-982e01ea7a962e0b22fabd50af3a1a34b010a6d370d6e24991eeaa799cae99eac92b0bc1a4f3d93d69e4767cb31848b3a4837729c0bc591241590fb131356f3b"' : 'data-bs-target="#xs-components-links-module-AppModule-982e01ea7a962e0b22fabd50af3a1a34b010a6d370d6e24991eeaa799cae99eac92b0bc1a4f3d93d69e4767cb31848b3a4837729c0bc591241590fb131356f3b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-982e01ea7a962e0b22fabd50af3a1a34b010a6d370d6e24991eeaa799cae99eac92b0bc1a4f3d93d69e4767cb31848b3a4837729c0bc591241590fb131356f3b"' :
                                            'id="xs-components-links-module-AppModule-982e01ea7a962e0b22fabd50af3a1a34b010a6d370d6e24991eeaa799cae99eac92b0bc1a4f3d93d69e4767cb31848b3a4837729c0bc591241590fb131356f3b"' }>
                                            <li class="link">
                                                <a href="components/AdminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AideComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AideComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ArticleTendanceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ArticleTendanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CatgoriePageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CatgoriePageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChatroomComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatroomComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CommentairesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentairesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConnexionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConnexionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateEnchereComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateEnchereComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DerniereEnchereComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DerniereEnchereComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EncherePageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EncherePageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FavorisComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FavorisComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HistoriqueComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HistoriqueComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InscriptionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InscriptionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageEncheresComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManageEncheresComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageUsersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManageUsersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MesEncheresComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MesEncheresComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ObjetsGagnesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ObjetsGagnesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SousCategoriePageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SousCategoriePageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TableauDeBordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TableauDeBordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserSpaceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserSpaceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WatchlistPopupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WatchlistPopupComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-982e01ea7a962e0b22fabd50af3a1a34b010a6d370d6e24991eeaa799cae99eac92b0bc1a4f3d93d69e4767cb31848b3a4837729c0bc591241590fb131356f3b"' : 'data-bs-target="#xs-injectables-links-module-AppModule-982e01ea7a962e0b22fabd50af3a1a34b010a6d370d6e24991eeaa799cae99eac92b0bc1a4f3d93d69e4767cb31848b3a4837729c0bc591241590fb131356f3b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-982e01ea7a962e0b22fabd50af3a1a34b010a6d370d6e24991eeaa799cae99eac92b0bc1a4f3d93d69e4767cb31848b3a4837729c0bc591241590fb131356f3b"' :
                                        'id="xs-injectables-links-module-AppModule-982e01ea7a962e0b22fabd50af3a1a34b010a6d370d6e24991eeaa799cae99eac92b0bc1a4f3d93d69e4767cb31848b3a4837729c0bc591241590fb131356f3b"' }>
                                        <li class="link">
                                            <a href="injectables/EnchereService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EnchereService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Categorie.html" data-type="entity-link" >Categorie</a>
                            </li>
                            <li class="link">
                                <a href="classes/Enchere.html" data-type="entity-link" >Enchere</a>
                            </li>
                            <li class="link">
                                <a href="classes/Message.html" data-type="entity-link" >Message</a>
                            </li>
                            <li class="link">
                                <a href="classes/SousCategorie.html" data-type="entity-link" >SousCategorie</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AlertServicesService.html" data-type="entity-link" >AlertServicesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthenticationService.html" data-type="entity-link" >AuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategorieService.html" data-type="entity-link" >CategorieService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EnchereService.html" data-type="entity-link" >EnchereService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaypalService.html" data-type="entity-link" >PaypalService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Message.html" data-type="entity-link" >Message</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PayPalDetails.html" data-type="entity-link" >PayPalDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SendMessageResponse.html" data-type="entity-link" >SendMessageResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});