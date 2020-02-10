this.componentTrigger = objectData => {

    const userId = localStorage.getItem("user_id") || false;
    const { top = 'unset', right = 'unset', left = 'unset', bottom = 'unset', label = 'Clique aqui', labelColor = '#2699FB', tooltip = '' } = objectData.button || {};
    const src = 'https://app.dev.clubeduratex.com.br/sim';
    const { openForm = 'circle', axisX = '50%', axisY = '3%', timeOpenEffect = '0.3', timeShowContent = '0.3', effect = 'ease-in' } = objectData.animation || {}
    const {invoice = false, taxCoupon = false, nfe = false, batch = false, seller =false } = objectData.optionSelect || {}

    let height = window.innerHeight + 'px';
    let width = window.innerWidth + 'px';

    const clipBuilder = (action) => {
      if (action === 'open') return `${openForm}(${width} at ${axisX} ${axisY})`
      return `${openForm}(0px at ${axisX} ${axisY})`
    }

    const optionBuilder = () => {

      return `${src}?option=${taxCoupon?1:0}${invoice?1:0}${nfe?1:0}${batch?1:0}${seller?1:0}`
    }


    const containerBuilder = (e) => {

      const element = document.getElementById('baseDiv')
      const openButton = document.getElementById('triggerBtn')
      const closeButton = document.getElementById('closeBtn')
      const elementNoSrc = document.getElementById('noSrc')
      const elementFormContainer = document.getElementById('formContainer')
      console.log(element.style.clipPath, clipBuilder())
      if (element.style.clipPath !== clipBuilder()) {
        element.style.clipPath = clipBuilder();
        if (elementFormContainer) elementFormContainer.style.opacity = 0;
        if (elementNoSrc) elementNoSrc.style.opacity = 0;
        setTimeout(() => {
          closeButton.style.display = 'none';
          openButton.style.display = 'block';
        }, 900 * timeShowContent)
      } else {
        element.style.clipPath = clipBuilder('open')
        if (elementFormContainer) elementFormContainer.style.opacity = 1;
        if (elementNoSrc) elementNoSrc.style.opacity = 1;
        setTimeout(() => {
          closeButton.style.display = 'block';
          openButton.style.display = 'none';
        }, 1000 * timeShowContent)
      }
    }

    //Create warnin for when src is empty
    let noSrc = document.createElement('div');
    noSrc.id = 'noSrc'
    noSrc.innerHTML = 'Não há uma fonte informada.';
    noSrc.style.cssText = `top: 50%; left: 50%; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; text-shadow: none;  position: absolute; font-size: 50px; padding:.7rem 1.4rem; border-radius: .6rem; background: #2699FB; z-index: 999; display: block; color: #FFF; font-weight: 600; transform: translate(-50%,-50%); opacity: 0; transition: opacity 1s ease-out ${timeShowContent}s;`;

    //Create floating button to close
    let close = document.createElement('a');
    close.onclick = containerBuilder;
    close.title = 'Clique aqui para fechar essa janela.';
    close.innerHTML = 'X';
    close.id = "closeBtn";
    close.style.cssText = `top: 10px; right: 10px; text-decoration: none; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;  cursor:pointer; position: fixed; padding:.7rem 1.4rem;  z-index: 999; display: none; color: #FFF; font-weight: 400;`;

    //Create floating button to open
    let open = document.getElementById('trigerBtn');
    open.onclick = containerBuilder;
    open.href = '#baseDiv';
    open.title = tooltip;
    open.innerHTML = label;
    //open.id = "triggerBtn";
    //open.style.cssText = `top: ${top}; left: ${left}; right: ${right}; bottom: ${bottom}; text-decoration: none; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; text-shadow: none; cursor:pointer; position: fixed; padding:.7rem 1.4rem; border-radius: .6rem; background: ${labelColor}; z-index: 999; display: block; color: #FFF; font-weight: 600;`;

    //Creating container for Iframe
    let base = document.createElement('div');
    base.id = "baseDiv";
    base.style.cssText = `position:absolute; height:100vh; width:100%; -moz-box-shadow: 0px 0px 8px  #fff; display:block; text-align:center; top:0px; background:${labelColor}; z-index:998; overflow:hidden; transition: all ${timeOpenEffect}s ${effect}; clip-path: ${clipBuilder()}; web-clip-path: ${clipBuilder()};`;

    //Creating Iframe
    let iframe = document.createElement('iframe');
    iframe.id = 'formContainer';
    iframe.src = `${optionBuilder()}${userId ? `&id=${userId}` : ''}`
    iframe.style.cssText = `height: 100%; width: 100%; transition: opacity 1s ease-out ${timeShowContent}s; opacity: 0;`;

    if (src) base.appendChild(iframe);
    else base.appendChild(noSrc);
    document.querySelector('body').prepend(base);
    document.querySelector('body').prepend(open);
    document.querySelector('body').prepend(close);
  };
