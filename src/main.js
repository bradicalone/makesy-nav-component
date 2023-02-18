/* This will be the class for the whole site
*   extends this class for another class 
*/
export default class Main {
        constructor() {
            this.state = {}
            this.iconNavigation()
        }
        // Each component or page can be a method
        iconNavigation() {
            const state = {
                parentMenuElements: Array.from(document.querySelectorAll('.icon__menu[data-menu]')),
                menusContainer: document.querySelector('.header__icon-menus'),
                underlay: document.querySelector('.nav-underlay'),
                menuPositions: {},
                wW: window.innerWidth,
                currentMenu: null
            }
    
            const getHoverPositions = (posOfNav) => {
                const menuPositions = {}
                for (const menu of state.parentMenuElements) {
                    const pos = menuPositions[menu.dataset.menu] = menu.getBoundingClientRect()
                    // If there is starting transform in the css for the menus
                    const cssTransform = getComputedStyle(menu).transform.replace(/[^,\d]/g, '').split(',')[4]
                    if(cssTransform) {
                        pos.x = pos.x - Number(cssTransform)
                    }
                    pos.menu = menu
                }
    
                const hoverTargets = Array.from(document.querySelectorAll('.header__icon-layout [data-menu]'))
                hoverTargets.forEach((target, i) => {
                    const targetTitle = target.dataset.menu
                    const targetPos = target.getBoundingClientRect()
                    const menuPos = menuPositions[targetTitle]
                    if (posOfNav === 'right') {
                        menuPositions[targetTitle].posX = targetPos.right - (menuPos.x + menuPos.width)
                    } else if (posOfNav === 'left') {
                        menuPositions[targetTitle].posX = targetPos.left
                    }
                    // Navigation either in MIDDLE or taking up most of view port 
                    else {
                        const targetWidthDiffRight = state.wW - targetPos.right
                        if (targetWidthDiffRight < menuPos.width) {
                            menuPositions[targetTitle].posX = targetPos.x - (menuPos.x + menuPos.width)
                        } else {
                            menuPositions[targetTitle].posX = targetPos.left
                        }
                    }
                })
                state.menuPositions = menuPositions
            }
            getHoverPositions('right')
    
            const removeStyles = () => {
                state.menusContainer.style = null
                if (state.currentMenu) {
                    state.currentMenu.style = null
                    state.currentMenu = null
                }
                state.underlay.removeAttribute('style') 
                state.underlay.removeEventListener("mouseenter", removeStyles)
            }
    
            const navIconsContainer = document.querySelector('.header__icon-layout')
            navIconsContainer.addEventListener('mouseover', (e) => {
               
                const menuTitle = e.target.getAttribute('data-menu')
                // If hovered over a target (the icons in this case)
                if (menuTitle) {
                    
                    const { width, height, posX, menu } = state.menuPositions[menuTitle]
                    if (state.underlay.style.pointerEvents === '') {
                        state.underlay.style.pointerEvents = 'auto'
                        state.underlay.style.zIndex = 5
                        state.underlay.addEventListener("mouseenter", removeStyles)
                    }
                    state.menusContainer.style.transform = `translate(${posX}px)`
                    state.menusContainer.style.width = width + 'px'
                    state.menusContainer.style.height = height + 'px'
                    if (state.currentMenu) {
                        state.currentMenu.style = null
                    }
                    menu.style.transform = 'translate(0%)'
                    menu.style.opacity = 1
                    state.currentMenu = menu
                }
            })
        }
    }
