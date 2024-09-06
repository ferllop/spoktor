import {Playlist} from './playlist-builder.js'
import {toSpotifyTextTrack} from '../track/spotify-text-track-builder.js'
import { MinimalTrackData } from '../track/track-builder.js'

export function toSpotifyPlainTextPlaylist(playlist: Playlist<MinimalTrackData>) {
    return header(playlist.playlistName) 
        + '\n' 
        + playlist.tracks.map(toSpotifyTextTrack).join('\n\n')
        + '\n' 
        + footer()
}

function header(playlistName: string) {
    return `somerandomcharactersonalongstring--sgljhsfgljhfljahfpawuyrapjdfhsñkjgsfkgjfg

${Boolean(playlistName) ? playlistName : '4 de Junio 2022'}
Upgrade

theuser

Spotify<https://open.spotify.com/>

  *

    Home <https://open.spotify.com/>
  *

    Search <https://open.spotify.com/search>
  *

    Your Library <https://open.spotify.com/collection>

Create Playlist

Liked Songs
<https://open.spotify.com/collection/tracks>
Your Episodes
<https://open.spotify.com/collection/episodes>
------------------------------------------------------------------------

  *
    4 de Junio 2022
    <https://open.spotify.com/playlist/1mcEFkMJUbRjKG4QuXu2q9>
  *
    carnaval 2022 mama
    <https://open.spotify.com/playlist/1W0X6U8GupQnU4xtMwfmys>
  *
    Músicas para curtir o carnaval em casa!
    <https://open.spotify.com/playlist/4kcMEWqTpEGUg9Zmh5OpEw>
  *
    Mezclas <https://open.spotify.com/playlist/6OMuOM37r6f26cBhmmafC0>
  *
    Circo <https://open.spotify.com/playlist/4nbF3oMD1DOvtd19V6W9f9>
  *
    Go Music <https://open.spotify.com/playlist/0MWkJce2qvibpjoUj4bgXf>
  *
    odo el poder del Rock
    <https://open.spotify.com/playlist/24t41sXCQ0cPv6DoSc0wLN>
  *
    Novios mama <https://open.spotify.com/playlist/7IndiiNcfKHdcwNJZd057q>
  *
    Daily Mix 6 <https://open.spotify.com/playlist/37i9dQZF1E35NO3CqClYDj>
  *
    Daily Mix 5 <https://open.spotify.com/playlist/37i9dQZF1E35vHWe59szZ6>

Install App <https://open.spotify.com/download>
Resize main navigation

Playlist Icon
<https://open.spotify.com/show/sfsfsdfasfasfer?uid=efdg4dfgrtfg&uri=spotify%3Aepisode%3Aewytewtewythgh>

El traje nuevo del emperador
<https://open.spotify.com/episode/3DWR47wEH0Z1zLWkwX4ECn>
Cuentos infantiles <https://open.spotify.com/show/1rSm3ZO8msZmoMkWEB2mUC>

15:16
Change progress

15:16

Change volume

Listening on AA-L678

${Boolean(playlistName) ? playlistName : '4 de Junio 2022'}
Choose photo


    Playlist


  ${Boolean(playlistName) ? playlistName : '4 de Junio 2022'}

theuser <https://open.spotify.com/user/theuser>
1 like73 songs, 4 hr 51 min

#
title
album
date added
`
}

function footer(){
    return `
Find more

RecommendedBased on what's in this playlist
Refresh


    About Your Privacy

We process your data for purposes such as delivering content or
advertisements and measuring the delivery of such content or
advertisements to extract insights about our website. We may share this
information with our partners. Cookies set by Spotify are labelled
“first party”; you may exercise your preferences in relation to first
party cookies by toggling the switch for each first party cookie
category below. The remaining cookies are third party cookies; you may
exercise your preferences in relation to each purpose by toggling the
relevant switch below or by vendor by clicking “List of IAB Vendors.”
These choices will be signaled globally to other websites participating
in the Transparency and Consent Framework.
Cookie Policy <https://www.spotify.com/legal/cookies-policy/>
Allow All


      Manage Consent Preferences


Strictly Necessary Cookies

Always Active
Strictly Necessary Cookies

These cookies are necessary for the service to function and cannot be
switched off in our systems. They are usually only set in response to
actions made by you which amount to a request for services, such as
setting your privacy preferences, logging in or filling in forms. You
can set your browser to block or alert you about these cookies, but some
parts of the service will not then work.


First Party Functional Cookies

First Party Functional Cookies

These cookies enable us to provide enhanced functionality and
personalisation. If you do not allow these cookies then some or all of
these services may not function properly.


First Party Performance Cookies

First Party Performance Cookies

These cookies allow us to count visits and traffic sources so we can
measure and improve the performance of our services. They help us to
know which pages are the most and least popular and see how visitors
move around the platform. If you do not allow these cookies we will not
be able to monitor the performance of our services.


First Party Targeting Cookies

First Party Targeting Cookies

These cookies may be used to deliver targeted advertisements and to
build a profile of your interests. If you do not allow these cookies you
will still experience advertising but it will be less tailored to you.


Store and/or access information on a device

Store and/or access information on a device

Cookies, device identifiers, or other information can be stored or
accessed on your device for the purposes presented to you.

  *


              Info Access & Storage

    Required Cookies

    .

List of IAB Vendors‎

 | View Full Legal Text Opens in a new Tab
<https://tcf.cookiepedia.co.uk/?lang=en>


Personalised ads

Personalised ads

  *


              Select personalised ads

    Required Cookies

    Personalised ads can be shown to you based on a profile about you.

  *


              Create a personalised ads profile

    Required Cookies

    A profile can be built about you and your interests to show you
    personalised ads that are relevant to you.

  *


              Select basic ads

    Required Cookies

    Ads can be shown to you based on the content you’re viewing, the app
    you’re using, your approximate location, or your device type.

List of IAB Vendors‎

 | View Full Legal Text Opens in a new Tab
<https://tcf.cookiepedia.co.uk/?lang=en>


Personalised content

Personalised content

  *


              Create a personalised content profile

    Required Cookies

    A profile can be built about you and your interests to show you
    personalised content that is relevant to you.

  *


              Select personalised content

    Required Cookies

    Personalised content can be shown to you based on a profile about you.

List of IAB Vendors‎

 | View Full Legal Text Opens in a new Tab
<https://tcf.cookiepedia.co.uk/?lang=en>


        Ad and content measurement, audience insights, and product
development

Ad and content measurement, audience insights, and product development

  *


              Apply market research to generate audience insights

    Required Cookies

    Market research can be used to learn more about the audiences who
    visit sites/apps and view ads.

  *


              Develop and improve products

    Required Cookies

    Your data can be used to improve existing systems and software, and
    to develop new products

  *


              Measure content performance

    Required Cookies

    The performance and effectiveness of content that you see or
    interact with can be measured.

  *


              Measure ad performance

    Required Cookies

    The performance and effectiveness of ads that you see or interact
    with can be measured.

List of IAB Vendors‎

 | View Full Legal Text Opens in a new Tab
<https://tcf.cookiepedia.co.uk/?lang=en>


Ensure security, prevent fraud, and debug

Always Active
Ensure security, prevent fraud, and debug

Your data can be used to monitor for and prevent fraudulent activity,
and ensure systems and processes work properly and securely.

List of IAB Vendors‎

 | View Full Legal Text Opens in a new Tab
<https://tcf.cookiepedia.co.uk/?lang=en>


Technically deliver ads or content

Always Active
Technically deliver ads or content

Your device can receive and send information that allows you to see and
interact with ads and content.

List of IAB Vendors‎

 | View Full Legal Text Opens in a new Tab
<https://tcf.cookiepedia.co.uk/?lang=en>


Match and combine offline data sources

Always Active
Match and combine offline data sources

Data from offline data sources can be combined with your online activity
in support of one or more purposes

List of IAB Vendors‎

 | View Full Legal Text Opens in a new Tab
<https://tcf.cookiepedia.co.uk/?lang=en>


Link different devices

Always Active
Link different devices

Different devices can be determined as belonging to you or your
household in support of one or more of purposes.

List of IAB Vendors‎

 | View Full Legal Text Opens in a new Tab
<https://tcf.cookiepedia.co.uk/?lang=en>


        Receive and use automatically-sent device characteristics for
identification

Always Active
Receive and use automatically-sent device characteristics for identification

Your device might be distinguished from other devices based on
information it automatically sends, such as IP address or browser type.

List of IAB Vendors‎

 | View Full Legal Text Opens in a new Tab
<https://tcf.cookiepedia.co.uk/?lang=en>


Functional Cookies

Functional Cookies

These cookies allow the website to remember choices you make (such as
your user name, language or the region you are in) and provide enhanced,
more personal features and content. These cookies can also be used to
remember changes you have made to text size, fonts and other parts of
web pages that you can customise. If you do not allow these cookies then
some or all of these services may not function properly.


Performance Cookies

Performance Cookies

These cookies gather data about how visitors use our services to enhance
the performance of our services. For example, these cookies allow us to
count visits and traffic sources so we can measure and improve the
performance of our services. They help us to know which pages are the
most and least popular and see how visitors interact with our services.
If you do not allow these cookies we will not be able to monitor the
performance of our services.


Targeting Cookies

Targeting Cookies

These cookies are used to deliver advertisements more relevant to you
and your interests. They are also used to limit the number of times you
see an advertisement as well as help measure the effectiveness of the
advertising campaigns. They remember that you have visited a website and
this information may be shared with other organisations such as
advertisers. These cookies collect information about your browsing
habits in order to make advertising relevant to you and your interests.

Confirm My Choices

<https://www.onetrust.com/products/cookie-consent/>

Back Button

Back


      Performance Cookies

Vendor Search

Search Icon

Filter Icon

Clear Filters

Information storage and access
Apply

Consent Leg.Interest

All Consent Allowed
Select All Vendors
Select All Vendors

All Consent Allowed

Confirm My Choices

<https://www.onetrust.com/products/cookie-consent/>
`
}
