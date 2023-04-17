$(document).ready(function() {

	$('input[type="tel"]').inputmask("+38 (999) 999-99-99");

	$('form').on('submit', function (e) {
		e.preventDefault(); // предотвращение стандартного поведения формы
		var form = $(this);

        // блокировка кнопки отправки формы
		form.find('button[type="submit"]').prop('disabled', true);
		
		
		// отправка формы с помощью AJAX
		$.ajax({
			url: 'send-mail.php',
			type: 'POST',
			data: form.serialize(),
			success: function (data) {
				form[0].reset(); // очистка формы
				// Открываем модальное окно благодарности после успешной отправки формы
				const thankPopup = document.getElementById('modal-thank');
				popupOpen(thankPopup);
			},
			
			complete: function() {
				// разблокировка кнопки отправки формы после завершения AJAX-запроса
				form.find('button[type="submit"]').prop('disabled', false);
			}
		});
	});

  
	// закрытие модального окна при нажатии на кнопку закрытия
	
});


$(document).ready(function () {
    $('.header__burger').click(function (event) {
        $('.header__burger, .menu, .header__button').toggleClass('active');
        $('body').toggleClass('lock');
        $('.menu').toggleClass('open');
    });
    $('.menu__link').click(function (event) {
        $('.header__burger, .menu, .header__button').removeClass('active');
        $('body').removeClass('lock');
    });
});


$(document).ready(function(){
    $('.work__container').slick({
        arrows:true,
        dots:true,
        slidesToShow:4,
        slidesToScroll:4,
        rows: 2,
        infinite: true,
        responsive: [
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 3,
					slidesToScroll:3,

                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 2,
					slidesToScroll:2,

                }
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 1,
					slidesToScroll:1,
					rows: 3,
                }
            }
        ]
    });
});
// $(document).ready(function(){
//     $('.certificates__inner').slick({
//         arrows:true,
//         dots:true,
//         slidesToShow:5,
// 		slidesToScroll: 5,
//         infinite: true,
//         responsive: [
//             {
//                 breakpoint: 850,
//                 settings: {
//                     slidesToShow: 3,
// 					slidesToScroll: 3,
//                 }
//             },
//             {
//                 breakpoint: 650,
//                 settings: {
//                     slidesToShow: 2,
// 					slidesToScroll: 2,
// 					infinite: true,
// 					arrows:true,
//         			dots:true,
//                 }
//             },
//             {
//                 breakpoint: 450,
//                 settings: {
//                     slidesToShow: 1,
// 					slidesToScroll: 1,
//                 }
//             }
//         ]
//     });
// });

$(document).ready(function () {
	$('.work__container').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom mfp-img-mobile',

		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300,
			opener: function (element) {
				return element.find('img');
			}
		}

	});
});
$(document).ready(function () {
	$('.certificates__inner').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom mfp-img-mobile',

		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300,
			opener: function (element) {
				return element.find('img');
			}
		}

	});
});


$(document).ready(function() {

	$('.question__block--title').click(function(event) {
		if($('.question__block').hasClass('one')){
			$('.question__block--title').not($(this)).removeClass('active');
			$('.question__block--text').not($(this).next()).slideUp(300);

		}
		$(this).toggleClass('active').next().slideToggle(300);

	});

});


const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 300;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();