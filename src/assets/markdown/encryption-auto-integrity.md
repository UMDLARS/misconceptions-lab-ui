# Encryption Provides Integrity and Authenticity

## Overview

A common misconception people have is that encryption also gives your data integrity and provides you with a means to authenticate it - after all, “If they can’t read it, they can’t modify it, and as such, it must be correct”. The reality of the situation is that encryption on its own does not have any means of verifying integrity. This is due to a principle that encryption follows called the strict avalanche criterion (SAC). SAC states that a change to a single bit will result in a 50% chance of all other bits in the encryption changing. What this essentially means is a changed bit in the message you encrypt greatly changes the resulting encrypted message. This principle also works in reverse, meaning that a single change to an encrypted message will greatly change what the decrypted message says. By the end of this activity, you will have an understanding of the real world consequences that stem from trusting encryption to provide integrity, as well as methods used in conjunction with encryption to ensure integrity.

## Examples

Communication over computer networks are encrypted using protocols known as Transport Layer Security (TLS). One part of TLS is the use of a key-hashed message authentication code before encryption to ensure that the encrypted data’s integrity and authenticity can be verified once it is decrypted. Without this hash, there is nothing to prevent somebody from capturing otherwise encrypted communications and changing them before they reach their destination.
https://tools.ietf.org/html/rfc5246

All Amazon Web Services APIs use key-hashed message authentication codes as the primary means for ensuring integrity and authenticity in messages between clients and their servers. Without this, encrypted packets can be intercepted and modified to disrupt user activity https://docs.aws.amazon.com/AWSECommerceService/latest/DG/HMACSignatures.html

## Activity

```learning goes here```

## Check Your Understanding

## See Also
