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
  <!-- GOOGLE MAP (HERO) -->
  <section id="map" class="pt-24 pb-12 bg-muted/20 scroll-mt-16">
    <div class="container mx-auto px-4 md:px-8">

      <div class="rounded-2xl overflow-hidden border border-border shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7891.911751061956!2d125.9743272!3d8.5036654!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32fdfcec0b3e6c19%3A0xb8c88f05389f18ef!2sSaint%20Francis%20Xavier%20College!5e0!3m2!1sen!2sph!4v1769919580174!5m2!1sen!2sph"
          width="100%"
          height="400"
          style="border:0;"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </section>

  <!-- CONTACT INFO + FORM -->
  <section id="contact" class="py-24 bg-background scroll-mt-16">
    <div class="container mx-auto px-4 md:px-8">
      <div class="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">

        <!-- CONTACT DETAILS -->
        <div>
          <h1 class="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Contact Us
          </h1>
          <h3 class="text-2xl font-semibold mb-4 text-foreground">
            Have any inquiries or concerns?
          </h3>
          <p class="text-lg text-muted-foreground mb-8">
            Fill out our form details to send us a message. We will get back to you as soon as possible. Alternatively, you may visit our directory to contact the offices/departments directly.
          </p>

          <div class="space-y-6 text-lg text-muted-foreground">
            <div class="flex items-start gap-4">
              <MapPin class="w-6 h-6 text-tertiary shrink-0 mt-1" />
              <p>
                St. Francis Xavier College<br />
                Agusan del Sur, Philippines
              </p>
            </div>

            <div class="flex items-center gap-4">
              <Phone class="w-6 h-6 text-tertiary shrink-0" />
              <p>+63 985 343 8327</p>
            </div>

            <div class="flex items-center gap-4">
              <Mail class="w-6 h-6 text-tertiary shrink-0" />
              <p>communications@sfxc.edu.ph</p>
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
          <form class="space-y-4" @submit.prevent>
            <div>
              <label class="block text-sm font-medium mb-1 text-foreground">Name:</label>
              <input
                type="text"
                class="w-full p-3 rounded-lg border border-border bg-background"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1 text-foreground">ID Number:</label>
              <input
                type="text"
                class="w-full p-3 rounded-lg border border-border bg-background"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1 text-foreground">Year Level / Year Graduated:</label>
              <input
                type="text"
                class="w-full p-3 rounded-lg border border-border bg-background"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1 text-foreground">College:</label>
              <select class="w-full p-3 rounded-lg border border-border bg-background">
                <option value="" disabled selected>Select College</option>
                <option>College of Business Education</option>
                <option>College of Criminal Justice Education</option>
                <option>College of Teacher Education</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1 text-foreground">Course:</label>
              <select class="w-full p-3 rounded-lg border border-border bg-background">
                <option value="" disabled selected>Select Course</option>
                <option>Bachelor of Science in Information Technology</option>
                <option>Bachelor of Science in Business Administration</option>
                <option>Bachelor of Science in Accountancy</option>
                <option>Bachelor of Science in Office Administration</option>
                <option>Bachelor of Science in Criminology</option>
                <option>Bachelor of Science in Elementary Education</option>
                <option>Bachelor of Science in Secondary Education</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1 text-foreground">Office or Department Concerned:</label>
              <select class="w-full p-3 rounded-lg border border-border bg-background" required>
                <option value="" disabled selected>Select Office/Department</option>
                <option>Accounting and Finance Office (including payments, property, and merchandise)</option>
                <option>Admission and Scholarship Office</option>
                <option>Auxiliary Office</option>
                <option>College of Business Education</option>
                <option>College of Criminal Justice Education</option>
                <option>College of Teacher Education</option>
                <option>Community Development Service Office</option>
                <option>Compliance and Quality Assurance Office</option>
                <option>Human Resources Office</option>
                <option>Information and Communication Office</option>
                <option>Library, or Learning Resource Center</option>
                <option>Marketing Office</option>
                <option>Office of Student Affairs and Services</option>
                <option>Registrar’s Office</option>
                <option>Research Office</option>
                <option>Technical Vocational Office</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1 text-foreground">Concern:</label>
              <textarea
                rows="5"
                class="w-full p-3 rounded-lg border border-border bg-background"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full bg-tertiary text-tertiary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition mt-4"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- OFFICE DIRECTORY -->
  <section id="directory" class="bg-white relative overflow-hidden mt-12">
    <!-- Top Slanted Header -->
    <div class="bg-linear-to-r from-[#022c11] to-[#04471c] pt-8 pb-16 px-4 md:px-12 relative" style="clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);">
      <div class="container mx-auto flex justify-between items-center">
        <h2 class="text-4xl md:text-5xl font-bold text-white tracking-wide">Contact Us</h2>
        <img src="@/assets/images/sfxc-logo-only.png" alt="SFXC Logo" class="hidden md:block h-16 md:h-20 object-contain" />
      </div>
    </div>

    <!-- Directory Content -->
    <div class="container mx-auto px-4 md:px-12 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
        <!-- Column 1 -->
        <div class="space-y-8">
          <!-- Accounting -->
          <div>
            <h3 class="text-xl font-bold text-[#115e2a] mb-3">Accounting Office</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-[#115e2a] flex items-center justify-center shrink-0">
                  <Phone class="w-4 h-4 text-white" />
                </div>
                <span class="text-base font-medium text-gray-800">0908 8854 520</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-[#115e2a] flex items-center justify-center shrink-0">
                  <Mail class="w-4 h-4 text-white" />
                </div>
                <span class="text-base font-medium text-gray-800">accountingoffice@sfxc.edu.ph</span>
              </div>
            </div>
          </div>
          <!-- Finance -->
          <div>
            <h3 class="text-xl font-bold text-[#115e2a] mb-3">Finance Office</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-[#115e2a] flex items-center justify-center shrink-0">
                  <Phone class="w-4 h-4 text-white" />
                </div>
                <span class="text-base font-medium text-gray-800">0908 8853 694</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-[#115e2a] flex items-center justify-center shrink-0">
                  <Mail class="w-4 h-4 text-white" />
                </div>
                <span class="text-base font-medium text-gray-800">financeoffice@sfxc.edu.ph</span>
              </div>
            </div>
          </div>
          <!-- HR -->
          <div>
            <h3 class="text-xl font-bold text-[#115e2a] mb-3">Human Resources Office</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-[#115e2a] flex items-center justify-center shrink-0">
                  <Phone class="w-4 h-4 text-white" />
                </div>
                <span class="text-base font-medium text-gray-800">0955 6206 455</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-[#115e2a] flex items-center justify-center shrink-0">
                  <Mail class="w-4 h-4 text-white" />
                </div>
                <span class="text-base font-medium text-gray-800">humanresources@sfxc.edu.ph</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Column 2 -->
        <div class="space-y-8">
          <!-- ICO & Marketing -->
          <div>
            <h3 class="text-xl font-bold text-[#115e2a] mb-3">ICO and Marketing Office</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-[#115e2a] flex items-center justify-center shrink-0">
                  <Phone class="w-4 h-4 text-white" />
                </div>
                <span class="text-base font-medium text-gray-800">0908 8855 380</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-[#115e2a] flex items-center justify-center shrink-0">
                  <Mail class="w-4 h-4 text-white" />
                </div>
                <span class="text-base font-medium text-gray-800">infocomm@sfxc.edu.ph</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-[#115e2a] flex items-center justify-center shrink-0">
                  <Mail class="w-4 h-4 text-white" />
                </div>
                <span class="text-base font-medium text-gray-800">marketing@sfxc.edu.ph</span>
              </div>
            </div>
          </div>
          <!-- OSAS & Guidance -->
          <div>
            <h3 class="text-xl font-bold text-[#115e2a] mb-3">OSAS and Guidance Office</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-[#115e2a] flex items-center justify-center shrink-0">
                  <Phone class="w-4 h-4 text-white" />
                </div>
                <span class="text-base font-medium text-gray-800">0908 8856 201</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-[#115e2a] flex items-center justify-center shrink-0">
                  <Mail class="w-4 h-4 text-white" />
                </div>
                <span class="text-base font-medium text-gray-800">osas@sfxc.edu.ph</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-[#115e2a] flex items-center justify-center shrink-0">
                  <Mail class="w-4 h-4 text-white" />
                </div>
                <span class="text-base font-medium text-gray-800">guidanceoffice@sfxc.edu.ph</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Column 3 -->
        <div class="space-y-8">
          <!-- Registrar -->
          <div>
            <h3 class="text-xl font-bold text-[#115e2a] mb-3">Registrar Office</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-[#115e2a] flex items-center justify-center shrink-0">
                  <Phone class="w-4 h-4 text-white" />
                </div>
                <span class="text-base font-medium text-gray-800">09088853687</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-[#115e2a] flex items-center justify-center shrink-0">
                  <Mail class="w-4 h-4 text-white" />
                </div>
                <span class="text-base font-medium text-gray-800">Registraroffice@sfxc.edu.ph</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Slanted Footer -->
    <div class="w-full h-12 md:h-16 bg-linear-to-r from-[#022c11] to-[#04471c]" style="clip-path: polygon(0 50%, 100% 0, 100% 100%, 0 100%);"></div>
  </section>
</template>

<style scoped></style>
