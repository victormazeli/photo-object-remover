import cv2
import numpy as np

# Load the source image
source_image = cv2.imread('source-image.jpg')

# Create a mask with the same dimensions as the source image
mask = np.ones_like(source_image) * 255

# Define the region of the object to be removed (e.g., a rectangle)
start_point = (100, 100)
end_point = (300, 300)
color = (0, 0, 0)  # Black color for the object
thickness = -1  # Fill the rectangle

# Draw the rectangle on the mask
mask = cv2.rectangle(mask, start_point, end_point, color, thickness)

# Save the mask
cv2.imwrite('object-mask.png', mask)
