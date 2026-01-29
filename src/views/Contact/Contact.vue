<script setup lang="ts">
import { Mail, Phone, MapPin, Facebook, Globe } from 'lucide-vue-next'

// Custom YouTube icon as component
const YoutubeIcon = {
  name: 'YoutubeIcon',
  template: `
    <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
      <path d="M19.615 3.184a2.998 2.998 0 0 0-2.116-2.12C15.019.6 12 .6 12 .6s-3.019 0-5.499.464a2.998 2.998 0 0 0-2.116 2.12C3.9 5.064 3.9 8 3.9 8s0 2.936.485 4.816a2.998 2.998 0 0 0 2.116 2.12C8.981 15.4 12 15.4 12 15.4s3.019 0 5.499-.464a2.998 2.998 0 0 0 2.116-2.12C20.1 10.936 20.1 8 20.1 8s0-2.936-.485-4.816zM10 11V5l5 3-5 3z"/>
    </svg>
  `,
}
</script>

<template>
  <!-- HERO -->
  <section id="hero" class="relative">
    <div
      class="h-120 md:h-[75dvh] flex flex-col relative bg-[url('/src/assets/images/sfxc-building.jpg')] bg-cover bg-center bg-no-repeat"
    >
      <div class="absolute inset-0 bg-linear-to-t from-tertiary/90 via-background/20 to-transparent"></div>

      <div class="relative z-10 mt-auto w-full md:max-w-4xl ps-5 pb-16 md:ps-10 md:pb-24">
        <h1 class="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-md">
          Contact Us
        </h1>
        <p class="text-white/80 mt-4 text-lg md:text-xl max-w-xl">
          We’d love to hear from you. Reach out to Saint Francis Xavier College anytime.
        </p>
      </div>

      <div class="absolute bottom-0 left-0 right-0 text-background leading-none">
        <svg class="w-full h-12 md:h-24" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,224L1440,128L1440,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  </section>

  <!-- CONTACT INFO + FORM -->
  <section id="contact" class="py-24 bg-background scroll-mt-16">
    <div class="container mx-auto px-4 md:px-8">
      <div class="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">

        <!-- CONTACT DETAILS -->
        <div>
          <div class="inline-flex items-center gap-2 text-tertiary font-bold mb-4 uppercase tracking-wider text-sm">
            Get in Touch
          </div>
          <h3 class="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Contact Information
          </h3>

          <div class="space-y-6 text-lg text-muted-foreground">
            <div class="flex items-start gap-4">
              <MapPin class="w-6 h-6 text-tertiary shrink-0 mt-1" />
              <p>
                Saint Francis Xavier College<br />
                Agusan del Sur, Philippines
              </p>
            </div>

            <div class="flex items-center gap-4">
              <Phone class="w-6 h-6 text-tertiary shrink-0" />
              <p>+63 9XX XXX XXXX</p>
            </div>

            <div class="flex items-center gap-4">
              <Mail class="w-6 h-6 text-tertiary shrink-0" />
              <p>info@sfxc.edu.ph</p>
            </div>

            <!-- SOCIAL MEDIA -->
            <div class="pt-8 border-t border-border mt-8">
            <h4 class="text-lg font-bold text-foreground mb-4">
                Connect With Us
            </h4>
            <div class="flex gap-4">
                <!-- Facebook -->
                <a
                href="https://www.facebook.com/StFrancisXavierCollegeADS"
                target="_blank"
                class="w-12 h-12 rounded-xl bg-tertiary/20 flex items-center justify-center hover:bg-tertiary/30 transition"
                aria-label="Facebook"
                >
                <img src="@/assets/images/socialmedia/facebook.svg" alt="Facebook" class="w-6 h-6" />
                </a>

                <!-- YouTube -->
                <a
                href="https://www.youtube.com/@StFrancisXavierCollegeSFADS"
                target="_blank"
                class="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center hover:bg-red-500/30 transition"
                aria-label="YouTube"
                >
                <img src="@/assets/images/socialmedia/youtube.svg" alt="YouTube" class="w-6 h-6" />
                </a>

                <!-- Website (default globe icon) -->
                <a
                href="https://www.sfxc.edu.ph"
                target="_blank"
                class="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition"
                aria-label="Website"
                >
                <Globe class="w-6 h-6 text-primary" />
                </a>
            </div>
            </div>

          </div>
        </div>

        <!-- CONTACT FORM -->
        <div class="bg-muted/20 p-8 rounded-2xl border border-border shadow-sm">
          <h4 class="text-2xl font-bold mb-6 text-foreground">
            Send Us a Message
          </h4>

          <form class="space-y-4" @submit.prevent>
            <input
              type="text"
              placeholder="Full Name"
              class="w-full p-3 rounded-lg border border-border bg-background"
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              class="w-full p-3 rounded-lg border border-border bg-background"
              required
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              class="w-full p-3 rounded-lg border border-border bg-background"
              required
            ></textarea>

            <button
              type="submit"
              class="w-full bg-tertiary text-tertiary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- GOOGLE MAP -->
  <section id="map" class="py-24 bg-muted/20 scroll-mt-16">
    <div class="container mx-auto px-4 md:px-8">
      <div class="text-center mb-12">
        <h3 class="text-3xl md:text-4xl font-bold text-foreground">
          Our Location
        </h3>
      </div>

      <div class="rounded-2xl overflow-hidden border border-border shadow-lg">
        <iframe
          src="https://www.google.com/maps?q=St.%20Francis%20Xavier%20College&output=embed"
          width="100%"
          height="400"
          style="border:0;"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
