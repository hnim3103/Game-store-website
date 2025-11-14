// ==========================================================
// REVIEW CARD TOGGLE - Show More/Less
// ==========================================================
document.addEventListener('DOMContentLoaded', function() {
  const toggleButtons = document.querySelectorAll('.review-card__toggle');
  
  toggleButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const content = btn.closest('.review-card__content');
      const shortText = content.querySelector('.review-card__text--short');
      const fullText = content.querySelector('.review-card__text--full');
      
      // Toggle visibility
      const isExpanded = fullText.classList.contains('is-visible');
      
      if (isExpanded) {
        // Collapse
        fullText.classList.remove('is-visible');
        shortText.classList.remove('is-hidden');
        btn.textContent = 'SHOW MORE';
      } else {
        // Expand
        fullText.classList.add('is-visible');
        shortText.classList.add('is-hidden');
        btn.textContent = 'SHOW LESS';
      }
    });
  });

  // ==========================================================
  // REVIEW CARD ACTIONS - Like/Dislike
  // ==========================================================
  const actionButtons = document.querySelectorAll('.review-card__action');
  
  actionButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const card = btn.closest('.review-card');
      const isLikeButton = btn.classList.contains('review-card__action--like');
      const isDislikeButton = btn.classList.contains('review-card__action--dislike');
      
      // Get both buttons
      const likeBtn = card.querySelector('.review-card__action--like');
      const dislikeBtn = card.querySelector('.review-card__action--dislike');
      
      if (isLikeButton) {
        // Toggle like
        const wasActive = likeBtn.classList.contains('is-active');
        likeBtn.classList.toggle('is-active');
        
        // Remove dislike if active
        if (!wasActive) {
          dislikeBtn.classList.remove('is-active');
        }
      } else if (isDislikeButton) {
        // Toggle dislike
        const wasActive = dislikeBtn.classList.contains('is-active');
        dislikeBtn.classList.toggle('is-active');
        
        // Remove like if active
        if (!wasActive) {
          likeBtn.classList.remove('is-active');
        }
      }
    });
  });

  // ==========================================================
  // STAR RATING HOVER EFFECT (Optional Enhancement)
  // ==========================================================
  const ratingContainers = document.querySelectorAll('.review-card__rating');
  
  ratingContainers.forEach(function(container) {
    const stars = container.querySelectorAll('.review-card__star');
    
    stars.forEach(function(star, index) {
      star.addEventListener('mouseenter', function() {
        stars.forEach(function(s, i) {
          if (i <= index) {
            s.style.transform = 'scale(1.1)';
          }
        });
      });
      
      star.addEventListener('mouseleave', function() {
        stars.forEach(function(s) {
          s.style.transform = 'scale(1)';
        });
      });
    });
  });
});
